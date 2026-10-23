import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  ArrowLeft,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  Loader2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code,
  Cloud,
  FileText,
  X,
  RefreshCw,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import {
  notesService,
  extractSnippetFromHtml,
  formatRelativeTime,
  countWordsFromHtml,
  isRecentlyUpdated,
} from '../../services/notesService';

export default function Notes() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Primary Page States
  const [view, setView] = useState('list'); // 'list' | 'editor'
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Active Note & Editor State
  const [activeNote, setActiveNote] = useState(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'error'
  const [saveErrorMsg, setSaveErrorMsg] = useState('');
  const editorBodyRef = useRef(null);

  // Autosave & Debounce Tracking
  const debounceTimerRef = useRef(null);
  const latestContentRef = useRef({ id: null, title: '', body: '' });
  const activeSaveIdRef = useRef(0);

  // Delete Confirmation Modal State
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // -------------------------------------------------------------
  // Data Loading
  // -------------------------------------------------------------
  const loadNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      const data = await notesService.getNotes();
      setNotes(data);
      return data;
    } catch (err) {
      console.error('Failed to load notes:', err);
      setLoadError(err.message || 'Unable to load notes');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // -------------------------------------------------------------
  // Autosave Implementation
  // -------------------------------------------------------------
  const performSave = useCallback(async (noteId, title, body) => {
    if (!noteId) return;

    activeSaveIdRef.current += 1;
    const currentSaveId = activeSaveIdRef.current;
    setSaveStatus('saving');
    setSaveErrorMsg('');

    try {
      const updated = await notesService.updateNote(noteId, {
        title: title.trim() || 'Untitled Note',
        body,
      });

      // Avoid race conditions: only update if this is the newest save call
      if (currentSaveId === activeSaveIdRef.current) {
        setSaveStatus('saved');
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === updated.id ? updated : n))
        );
      }
    } catch (err) {
      if (currentSaveId === activeSaveIdRef.current) {
        console.error('Autosave failed:', err);
        setSaveStatus('error');
        setSaveErrorMsg(err.message || 'Failed to save note');
      }
    }
  }, []);

  const triggerAutosave = useCallback(() => {
    if (!latestContentRef.current.id) return;

    setSaveStatus('saving');
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const { id, title, body } = latestContentRef.current;
      performSave(id, title, body);
    }, 650);
  }, [performSave]);

  // Flush any pending save immediately (e.g. before navigating away)
  const flushPendingSave = useCallback(async () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    const { id, title, body } = latestContentRef.current;
    if (id && saveStatus === 'saving') {
      await performSave(id, title, body);
    }
  }, [performSave, saveStatus]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // -------------------------------------------------------------
  // Open Editor for Existing or New Note
  // -------------------------------------------------------------
  const openEditor = useCallback((note, isNewlyCreated = false) => {
    setActiveNote(note);
    setEditorTitle(note.title || '');
    setWordCount(note.words || countWordsFromHtml(note.body || ''));
    setSaveStatus('saved');
    setSaveErrorMsg('');
    setView('editor');

    latestContentRef.current = {
      id: note.id,
      title: note.title || '',
      body: note.body || '',
    };

    // Populate contentEditable on next tick after render
    setTimeout(() => {
      if (editorBodyRef.current) {
        editorBodyRef.current.innerHTML = note.body || '';
        if (isNewlyCreated) {
          const titleInput = document.getElementById('note-title-input');
          if (titleInput) {
            titleInput.focus();
            titleInput.select();
          }
        }
      }
    }, 0);
  }, []);

  // Create a new note
  const handleCreateNote = async (initialTitle = 'Untitled Note', initialBody = '<p></p>') => {
    try {
      setSaveStatus('saving');
      const newNote = await notesService.createNote({
        title: initialTitle,
        body: initialBody,
      });

      setNotes((prev) => [newNote, ...prev]);
      openEditor(newNote, true);
    } catch (err) {
      console.error('Failed to create note:', err);
      alert('Could not create new note. Please try again.');
    }
  };

  // Switch back to list view
  const handleBackToList = async () => {
    await flushPendingSave();
    setView('list');
    setActiveNote(null);
  };

  // Initial mount: load notes and check for URL parameters (e.g., from question detail)
  useEffect(() => {
    const init = async () => {
      const loaded = await loadNotes();
      const paramTitle = searchParams.get('title');
      const paramTopic = searchParams.get('topic');

      if (paramTitle || paramTopic) {
        setSearchParams({}); // Clear query params
        const titleText = paramTitle || (paramTopic ? `${paramTopic} Notes` : 'Untitled Note');
        const initialBody = paramTopic ? `<p><strong>Topic:</strong> ${paramTopic}</p><p></p>` : '<p></p>';
        handleCreateNote(titleText, initialBody);
      } else {
        setNotes(loaded);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------------------
  // Editor Input Handlers
  // -------------------------------------------------------------
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setEditorTitle(newTitle);
    latestContentRef.current.title = newTitle;
    triggerAutosave();
  };

  const handleBodyInput = (e) => {
    const html = e.currentTarget.innerHTML;
    latestContentRef.current.body = html;
    setWordCount(countWordsFromHtml(html));
    triggerAutosave();
  };

  // Rich-Text Toolbar Execution
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorBodyRef.current) {
      editorBodyRef.current.focus();
      const html = editorBodyRef.current.innerHTML;
      latestContentRef.current.body = html;
      setWordCount(countWordsFromHtml(html));
      triggerAutosave();
    }
  };

  // Retry save on error
  const handleRetrySave = () => {
    if (latestContentRef.current.id) {
      const { id, title, body } = latestContentRef.current;
      performSave(id, title, body);
    }
  };

  // -------------------------------------------------------------
  // Deletion Workflow
  // -------------------------------------------------------------
  const promptDelete = (note, e) => {
    if (e) e.stopPropagation();
    setNoteToDelete(note);
  };

  const confirmDelete = async () => {
    if (!noteToDelete || isDeleting) return;

    try {
      setIsDeleting(true);
      await notesService.deleteNote(noteToDelete.id);

      setNotes((prev) => prev.filter((n) => n.id !== noteToDelete.id));

      // If deleted note is currently in editor, return to list view
      if (activeNote && activeNote.id === noteToDelete.id) {
        setView('list');
        setActiveNote(null);
      }

      setNoteToDelete(null);
    } catch (err) {
      console.error('Failed to delete note:', err);
      alert('Failed to delete note. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // -------------------------------------------------------------
  // Filtered Notes List
  // -------------------------------------------------------------
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredNotes = notes.filter((n) => {
    if (!normalizedSearch) return true;
    const titleMatch = (n.title || '').toLowerCase().includes(normalizedSearch);
    const bodyMatch = (n.body || '').replace(/<[^>]+>/g, ' ').toLowerCase().includes(normalizedSearch);
    return titleMatch || bodyMatch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* PlacePro Breadcrumb Navigation */}
      <Breadcrumb
        items={
          view === 'editor'
            ? [
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Notes', onClick: handleBackToList },
                { label: editorTitle || 'Untitled Note' },
              ]
            : [
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Notes' },
              ]
        }
      />

      {/* ========================================================= */}
      {/* VIEW 1: NOTES LIST VIEW                                    */}
      {/* ========================================================= */}
      {view === 'list' && (
        <section className="space-y-6" data-purpose="notes-list-view">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Notes</h2>
              <p className="text-sm text-slate-500 mt-1">
                Capture ideas, concepts, interview notes, and placement preparation material.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleCreateNote()}
                className="bg-[#16793A] hover:bg-[#12632F] text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                id="btn-create-note"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>+ New Note</span>
              </button>
            </div>
          </div>

          {/* Filter & Search Controls Bar */}
          <div className="flex items-center justify-between gap-4 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by title or content..."
                className="w-full pl-9 pr-8 py-1.5 text-sm bg-transparent border-none rounded-lg focus:outline-none focus:ring-0 placeholder:text-slate-400 text-slate-800"
                id="notes-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-xs font-medium text-slate-500 pr-3 shrink-0" id="notes-counter">
              {isLoading
                ? 'Loading notes...'
                : `${filteredNotes.length} note${filteredNotes.length === 1 ? '' : 's'}`}
            </div>
          </div>

          {/* State: Loading */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((skeletonId) => (
                <div
                  key={skeletonId}
                  className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse space-y-3"
                >
                  <div className="h-5 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="pt-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <div className="h-3 bg-slate-100 rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* State: Load Error */}
          {!isLoading && loadError && (
            <div className="bg-white border border-rose-200 rounded-xl p-8 text-center space-y-3">
              <AlertCircle className="w-10 h-10 mx-auto text-rose-500" />
              <h4 className="text-base font-semibold text-slate-800">Failed to load notes</h4>
              <p className="text-sm text-slate-500">{loadError}</p>
              <button
                type="button"
                onClick={loadNotes}
                className="inline-flex items-center gap-2 bg-[#16793A] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#12632F] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* State: Empty Notes (no notes stored at all) */}
          {!isLoading && !loadError && notes.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#16793A]">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-slate-900">No notes yet</h4>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Capture your placement preparation notes, formulas, interview experiences, and important study concepts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCreateNote()}
                className="bg-[#16793A] hover:bg-[#12632F] text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Note</span>
              </button>
            </div>
          )}

          {/* State: No Search Matches (search term has no hits) */}
          {!isLoading && !loadError && notes.length > 0 && filteredNotes.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center" id="no-search-results">
              <Search className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <h4 className="text-base font-medium text-slate-800">No matching notes found</h4>
              <p className="text-sm text-slate-500 mt-1 mb-4">
                No notes match &ldquo;{searchQuery}&rdquo;. Try searching with a different keyword or create a new note.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Clear search
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateNote(searchQuery)}
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#16793A] hover:bg-[#12632F] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create note &ldquo;{searchQuery}&rdquo;</span>
                </button>
              </div>
            </div>
          )}

          {/* State: Populated Notes Grid / Cards List */}
          {!isLoading && !loadError && filteredNotes.length > 0 && (
            <div className="grid grid-cols-1 gap-4" data-purpose="notes-cards-list" id="notes-grid">
              {filteredNotes.map((note) => {
                const snippet = extractSnippetFromHtml(note.body, 220);
                const words = note.words || countWordsFromHtml(note.body);
                const relativeTime = formatRelativeTime(note.updatedAt);
                const isRecent = isRecentlyUpdated(note.updatedAt);

                return (
                  <article
                    key={note.id}
                    onClick={() => openEditor(note)}
                    className="note-card bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group select-none"
                    data-id={note.id}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#16793A] transition-colors truncate">
                          {note.title || 'Untitled Note'}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {snippet || 'Empty note...'}
                        </p>
                      </div>

                      {/* Quick Card Actions (hover to reveal) */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditor(note);
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                          title="Edit Note"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => promptDelete(note, e)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                          title="Delete Note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Card Metadata Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            isRecent ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                        />
                        <span>{relativeTime}</span>
                        <span>·</span>
                        <span>{words} words</span>
                      </div>
                      <span className="text-[#16793A] font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Open editor →
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: NOTE EDITOR VIEW                                  */}
      {/* ========================================================= */}
      {view === 'editor' && activeNote && (
        <section className="space-y-4" data-purpose="note-editor-container">
          {/* Back Navigation & Autosave / Delete Action Header */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBackToList}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
              id="btn-back-to-notes"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Notes</span>
            </button>

            {/* Autosave and Delete Actions */}
            <div className="flex items-center gap-3">
              {/* Autosave Badge Indicator */}
              {saveStatus === 'saving' && (
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 transition-all border border-amber-200/50"
                  id="save-status-indicator"
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </div>
              )}

              {saveStatus === 'saved' && (
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E8F5E9] text-[#16793A] transition-all border border-emerald-200/50"
                  id="save-status-indicator"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Saved</span>
                </div>
              )}

              {saveStatus === 'error' && (
                <div
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 transition-all"
                  id="save-status-indicator"
                  title={saveErrorMsg || 'Save failed'}
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Save failed</span>
                  <button
                    type="button"
                    onClick={handleRetrySave}
                    className="underline hover:text-rose-900 font-semibold cursor-pointer ml-1"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Delete Active Note Button */}
              <button
                type="button"
                onClick={(e) => promptDelete(activeNote, e)}
                className="text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg text-xs font-medium border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                id="btn-delete-active-note"
                title="Delete this note"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Note Content Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Note Title Input Field */}
            <div className="px-6 pt-6 pb-2">
              <input
                id="note-title-input"
                type="text"
                value={editorTitle}
                onChange={handleTitleChange}
                placeholder="Note Title..."
                className="w-full text-xl font-bold text-slate-900 border-none px-0 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-300 tracking-tight bg-transparent"
              />
            </div>

            {/* Rich-Text Formatting Toolbar */}
            <div
              className="px-6 py-2 border-y border-slate-200/80 bg-slate-50/70 flex flex-wrap items-center gap-1 text-slate-700 select-none text-xs"
              data-purpose="editor-toolbar"
            >
              <button
                type="button"
                onClick={() => handleFormat('bold')}
                className="p-1.5 rounded hover:bg-slate-200/80 font-bold w-7 h-7 flex items-center justify-center transition-colors cursor-pointer"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleFormat('italic')}
                className="p-1.5 rounded hover:bg-slate-200/80 italic w-7 h-7 flex items-center justify-center transition-colors cursor-pointer"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleFormat('underline')}
                className="p-1.5 rounded hover:bg-slate-200/80 underline w-7 h-7 flex items-center justify-center transition-colors cursor-pointer"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-slate-300 mx-1" />

              <button
                type="button"
                onClick={() => handleFormat('insertUnorderedList')}
                className="px-2 py-1 rounded hover:bg-slate-200/80 flex items-center gap-1 transition-colors cursor-pointer"
                title="Bulleted List"
              >
                <List className="w-3.5 h-3.5" />
                <span>• List</span>
              </button>

              <button
                type="button"
                onClick={() => handleFormat('insertOrderedList')}
                className="px-2 py-1 rounded hover:bg-slate-200/80 flex items-center gap-1 transition-colors cursor-pointer"
                title="Numbered List"
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>1. List</span>
              </button>

              <button
                type="button"
                onClick={() => handleFormat('formatBlock', 'pre')}
                className="px-2 py-1 rounded hover:bg-slate-200/80 font-mono text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                title="Code snippet"
              >
                <Code className="w-3.5 h-3.5" />
                <span>&lt;/&gt; Code</span>
              </button>

              <div className="ml-auto text-[11px] text-slate-400 flex items-center gap-2">
                <span id="editor-word-count">{wordCount} words</span>
              </div>
            </div>

            {/* Note Content Textarea (Editable Body) */}
            <div
              ref={editorBodyRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleBodyInput}
              data-placeholder="Start typing your placement study notes here..."
              className="note-editor-content p-6 min-h-[380px] text-slate-700 leading-relaxed text-sm focus:outline-none space-y-3"
              id="editor-body-content"
            />

            {/* Autosave Network/Persistence Callout matching Stitch */}
            <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <Cloud className="w-3.5 h-3.5 text-[#16793A]" />
                <span>
                  Autosaves automatically to your PlacePro account via{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-slate-700 text-[10px]">
                    PUT /api/notes/:id
                  </code>
                </span>
              </div>
              <span className="text-slate-400 font-medium">PlacePro Cloud Sync</span>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION MODAL                                 */}
      {/* ========================================================= */}
      {noteToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">Delete Note</h3>
                <p className="text-sm text-slate-500">
                  Are you sure you want to delete &ldquo;
                  <span className="font-medium text-slate-700">
                    {noteToDelete.title || 'Untitled Note'}
                  </span>
                  &rdquo;? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setNoteToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? 'Deleting...' : 'Delete Permanently'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
