import React, { useState, useEffect } from 'react'
import Sidebar from './sidebar';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import './styles/index.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      ...noteData,
      createdAt: new Date().toLocaleDateString()
    };
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    setSelectedNote(null);
  };

  const handleOpenModal = (note = null) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className='App'>
      <div className='container'>
        <Sidebar 
          notes={notes} 
          onSelectNote={handleOpenModal}
          onAddNote={() => handleOpenModal(null)}
        />
        <div className='main-content'>
          <header className='app-header'>
            <h1>📝 Notes App</h1>
            <button 
              className='btn-add-note'
              onClick={() => handleOpenModal(null)}
            >
              + New Note
            </button>
          </header>
          <div className='notes-grid'>
            {notes.length > 0 ? (
              notes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleOpenModal}
                  onDelete={handleDeleteNote}
                />
              ))
            ) : (
              <div className='empty-state'>
                <p>No notes yet. Create your first note!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <NoteModal
          note={selectedNote}
          onSave={selectedNote ? handleUpdateNote : handleAddNote}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
