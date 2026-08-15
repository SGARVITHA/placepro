import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Plus, Search, ChevronRight, Bold, Italic, Underline, List, ListOrdered, Code, Link as LinkIcon, Undo, Redo, Check } from 'lucide-react';
import { UserService } from '../../data/UserService';
import Breadcrumb from '../../components/ui/Breadcrumb';

export default function Notes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [activeNote, setActiveNote] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const editorRef = useRef(null);

  // Form State
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');

  const loadNoteIntoForm = (note) => {
    setActiveNote(note.id);
    setTitle(note.title);
    setTopic(note.topic || '');
    setContent(note.body);
    if (editorRef.current) {
      editorRef.current.innerHTML = note.body;
    }
    setIsSaved(false);
  };

  const handleNewNote = (defaultTitle = '', defaultTopic = '') => {
    setActiveNote(null);
    setTitle(defaultTitle);
    setTopic(defaultTopic);
    setContent('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
    setIsSaved(false);
  };

  useEffect(() => {
    const loaded = UserService.getNotes();
    setNotes(loaded);

    // Pre-fill from URL if creating via "Add Note"
    const initTopic = searchParams.get('topic');
    const initTitle = searchParams.get('title');
    if (initTopic || initTitle) {
      handleNewNote(initTitle || '', initTopic || '');
      setSearchParams({}); // Clear params
    } else if (loaded.length > 0 && !activeNote) {
      loadNoteIntoForm(loaded[0]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = () => {
    if (!title.trim()) return; // Don't save empty title notes
    
    const noteData = {
      id: activeNote || Date.now().toString(),
      title,
      topic,
      body: editorRef.current ? editorRef.current.innerHTML : content
    };

    const updated = UserService.saveNote(noteData);
    setNotes(updated);
    setActiveNote(noteData.id);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCancel = () => {
    if (activeNote) {
      // Revert to saved
      const savedNote = notes.find(n => n.id === activeNote);
      if (savedNote) loadNoteIntoForm(savedNote);
    } else {
      // Was a new draft, just clear it or load first
      if (notes.length > 0) loadNoteIntoForm(notes[0]);
      else handleNewNote();
    }
  };

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    (n.topic && n.topic.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 h-full pb-6">
      <Breadcrumb items={[
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Notes' }
      ]} />

      <div className="flex gap-6 h-[calc(100vh-180px)] min-h-[600px]">
        {/* Left Panel: List */}
        <div className="w-[320px] shrink-0 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">My Notes</h2>
            <button 
              onClick={() => handleNewNote()}
              className="flex items-center gap-1.5 bg-accent hover:bg-accent-dark text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Note
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 no-scrollbar">
            {filteredNotes.map(note => {
              const isActive = activeNote === note.id;
              return (
                <button
                  key={note.id}
                  onClick={() => loadNoteIntoForm(note)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    isActive 
                    ? 'bg-[#Edf4F0] border-accent/30 shadow-sm' 
                    : 'bg-white border-border hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-white text-accent' : 'bg-gray-50 text-gray-400'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-[15px] truncate mb-0.5 ${isActive ? 'text-accent' : 'text-text-primary'}`}>
                      {note.title}
                    </h4>
                    <p className="text-xs text-text-secondary">{note.updatedAt}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-gray-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="flex-1 bg-white border border-border rounded-xl flex flex-col shadow-sm">
          <div className="p-6 border-b border-border flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-text-primary mb-1.5">Note Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-app border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-medium text-text-primary"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-primary mb-1.5">Topic (Optional)</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-app border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                placeholder="e.g. Arrays"
              />
            </div>
          </div>

          <div className="border-b border-border p-2 px-4 flex items-center gap-1 overflow-x-auto">
            <select className="text-sm border-none bg-transparent font-medium text-text-primary focus:outline-none mr-2 cursor-pointer">
              <option>Normal</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
            </select>
            <div className="w-px h-5 bg-border mx-2"></div>
            <button onClick={() => exec('bold')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><Bold className="w-[18px] h-[18px]" /></button>
            <button onClick={() => exec('italic')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><Italic className="w-[18px] h-[18px]" /></button>
            <button onClick={() => exec('underline')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><Underline className="w-[18px] h-[18px]" /></button>
            <div className="w-px h-5 bg-border mx-2"></div>
            <button onClick={() => exec('insertUnorderedList')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><List className="w-[18px] h-[18px]" /></button>
            <button onClick={() => exec('insertOrderedList')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><ListOrdered className="w-[18px] h-[18px]" /></button>
            <button onClick={() => exec('formatBlock', 'PRE')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><Code className="w-[18px] h-[18px]" /></button>
            <button className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><LinkIcon className="w-[18px] h-[18px]" /></button>
            <div className="w-px h-5 bg-border mx-2"></div>
            <button onClick={() => exec('undo')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><Undo className="w-[18px] h-[18px]" /></button>
            <button onClick={() => exec('redo')} className="p-1.5 rounded hover:bg-gray-100 text-text-secondary"><Redo className="w-[18px] h-[18px]" /></button>
          </div>

          <div 
            ref={editorRef}
            className="flex-1 p-6 overflow-y-auto focus:outline-none text-[15px] leading-relaxed text-text-primary prose max-w-none"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          >
          </div>

          <div className="p-5 border-t border-border flex items-center justify-between bg-gray-50/50 rounded-b-xl">
            <div className="text-sm font-bold text-accent flex items-center gap-2">
              {isSaved && <><Check className="w-4 h-4" /> Saved</>}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleCancel} className="px-5 py-2.5 rounded-lg font-medium text-text-secondary hover:bg-black/5 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="px-6 py-2.5 rounded-lg font-bold bg-accent text-white hover:bg-accent-dark transition-colors shadow-sm">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
