import React from 'react'

function Sidebar({ notes, onSelectNote, onAddNote }) {
  return (
    <aside className='sidebar'>
      <div className='sidebar-header'>
        <h2>📚 My Notes</h2>
        <button className='btn-new-note' onClick={onAddNote} title='Add new note'>
          +
        </button>
      </div>
      <div className='notes-list'>
        {notes.length > 0 ? (
          notes.map(note => (
            <div 
              key={note.id}
              className='note-item'
              onClick={() => onSelectNote(note)}
            >
              <h3>{note.title || 'Untitled'}</h3>
              <p>{note.content?.substring(0, 50)}...</p>
              <small>{note.createdAt}</small>
            </div>
          ))
        ) : (
          <p className='empty-message'>No notes yet</p>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
