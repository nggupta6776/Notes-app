import React from 'react'

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className='note-card'>
      <div className='note-card-header'>
        <h2>{note.title || 'Untitled'}</h2>
        <div className='note-card-actions'>
          <button 
            className='btn-edit' 
            onClick={() => onEdit(note)}
            title='Edit note'
          >
            ✏️
          </button>
          <button 
            className='btn-delete' 
            onClick={() => onDelete(note.id)}
            title='Delete note'
          >
            🗑️
          </button>
        </div>
      </div>
      <p className='note-content'>{note.content}</p>
      <small className='note-date'>{note.createdAt}</small>
    </div>
  )
}

export default NoteCard
