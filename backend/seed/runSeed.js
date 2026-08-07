import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import seedData from './seedData.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function runSeed() {
  try {
    // 1. Insert companies
    const { data: companiesData, error: companiesError } = await supabase
      .from('companies')
      .insert(seedData.companies)
      .select();

    if (companiesError) {
      console.error('Error inserting companies:', companiesError);
      process.exit(1);
    }

    const companyMap = {};
    companiesData.forEach((c) => {
      companyMap[c.name] = c.id;
    });
    console.log(`Inserted ${companiesData.length} ${companiesData.length === 1 ? 'company' : 'companies'}`);

    // 2. Insert categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .insert(seedData.categories)
      .select();

    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError);
      process.exit(1);
    }

    const categoryMap = {};
    categoriesData.forEach((cat) => {
      categoryMap[cat.name] = cat.id;
    });
    console.log(`Inserted ${categoriesData.length} categories`);

    // 3. Insert topics
    const topicMap = {};

    const topLevelTopics = seedData.topics.filter((t) => t.parentKey === null);
    const childTopics = seedData.topics.filter((t) => t.parentKey !== null);

    // 3a. Top-level topics (parentKey is null)
    const topLevelRows = topLevelTopics.map((t) => ({
      name: t.name,
      category_id: categoryMap[t.categoryName],
      company_id: t.companyName ? companyMap[t.companyName] : null,
      parent_topic_id: null,
    }));

    const { data: topLevelData, error: topLevelError } = await supabase
      .from('topics')
      .insert(topLevelRows)
      .select();

    if (topLevelError) {
      console.error('Error inserting top-level topics:', topLevelError);
      process.exit(1);
    }

    topLevelTopics.forEach((t, idx) => {
      topicMap[t.key] = topLevelData[idx].id;
    });
    console.log(`Inserted ${topLevelData.length} top-level topics`);

    // 3b. Child topics (parentKey is NOT null)
    const childRows = childTopics.map((t) => ({
      name: t.name,
      category_id: categoryMap[t.categoryName],
      company_id: t.companyName ? companyMap[t.companyName] : null,
      parent_topic_id: topicMap[t.parentKey],
    }));

    const { data: childData, error: childError } = await supabase
      .from('topics')
      .insert(childRows)
      .select();

    if (childError) {
      console.error('Error inserting child topics:', childError);
      process.exit(1);
    }

    childTopics.forEach((t, idx) => {
      topicMap[t.key] = childData[idx].id;
    });
    console.log(`Inserted ${childData.length} child topics`);

    // 4. Insert questions
    const questionRows = seedData.questions.map((q) => ({
      topic_id: topicMap[q.topicKey],
      difficulty: q.difficulty,
      question_text: q.question_text,
      solution_text: q.solution_text,
      company_name: q.company_name,
      year_asked: q.year_asked,
    }));

    const { data: questionData, error: questionError } = await supabase
      .from('questions')
      .insert(questionRows)
      .select();

    if (questionError) {
      console.error('Error inserting questions:', questionError);
      process.exit(1);
    }

    console.log(`Inserted ${questionData.length} questions`);
    console.log('Seed complete.');
  } catch (err) {
    console.error('Unexpected error during seeding:', err);
    process.exit(1);
  }
}

runSeed();
