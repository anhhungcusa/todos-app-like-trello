import React, { useState, useContext, useEffect } from 'react';

import './EditModal.css';
import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider';

export const EditModal = (props) => {
    const {feature: { editModalValue, editTodo, toggleEditMode }} = useContext(localStorageDataContext);
    const [title, setTitle] = useState('');
    useEffect(() => {
        if(editModalValue !== null) {
            setTitle(editModalValue.todo.title);
        }
    }, [editModalValue])
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
    return editModalValue && (
        <div className="quick-card-editor">
            <button className="close-editor" onClick={closeModal}>X</button>
            <div className="quick-editor-card" style={{
                top: `${editModalValue.coordinate.top}px`,
                left: `${editModalValue.coordinate.left}px`
            }} >
                <div className="editor-card">
                    <textarea value={title} onKeyUp={handleKeyUp} onChange={handleValueChange}  />
                </div>  
                <button onClick={saveTodo}>Save</button>
            </div>
        </div>
    )
}