import React, { useState, useEffect } from 'react'

function NoteModal({ note, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onSave({
        ...note,
        title: title || 'Untitled',
        content
      });
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>{note ? 'Edit Note' : 'New Note'}</h2>
          <button className='btn-close' onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Note title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='modal-input-title'
          />
          
          <textarea
            placeholder='Write your note here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='modal-textarea'
            rows='10'
          />
          
          <div className='modal-actions'>
            <button 
              type='button' 
              className='btn-cancel'
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type='submit' 
              className='btn-save'
            >
              {note ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteModal
