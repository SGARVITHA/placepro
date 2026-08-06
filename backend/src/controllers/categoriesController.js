import { getCategories } from '../services/categoriesService.js';

export async function listCategories(req, res, next) {
  try {
    const { isCommon } = req.query;
    const data = await getCategories(isCommon);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
