import React, { useState, useRef, useEffect } from 'react';

import './EditModal.css';
import { Button } from '../../Button/Button';

export const EditModal = ({ editModalValue, editTodo, toggleEditMode}) => {
    const textareaRef = useRef(null);
    const [title, setTitle] = useState(editModalValue.todo.title);
    const handleValueChange = (e) => {
        setTitle(e.target.value);
    }
    const handleKeyUp = (e) => {
        if(e.keyCode === 27) {
            toggleEditMode(null)
        }
    }
    const closeModal = () => {
        toggleEditMode(null)
    }
    const saveTodo = () => {
        const { groupID, todo } = editModalValue;
        editTodo(groupID,{...todo, title});
        toggleEditMode(null)
    }
    const handleDocumentKeyUp = e => {
        
        if(e.keyCode === 27)
            closeModal();
    };
    useEffect(() => {
        textareaRef.current.focus();
        document.addEventListener('keyup', handleDocumentKeyUp);
        return () => {
            document.removeEventListener('keyup', handleDocumentKeyUp)
        }
    }, [])

    return editModalValue && (
        <div className="quick-card-editor">
            <Button className="close-editor" onClick={closeModal}>X</Button>
            <div className="quick-editor-card" style={{
                top: `${editModalValue.coordinate.top}px`,
                left: `${editModalValue.coordinate.left}px`
            }} >
                <div className="editor-card">
                    <textarea ref={textareaRef} value={title} onKeyUp={handleKeyUp} onChange={handleValueChange}  />
                </div>  
                <Button onClick={saveTodo}>Save</Button>
            </div>
        </div>
    )
}