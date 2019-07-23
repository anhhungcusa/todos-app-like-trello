import React, { useState, useContext } from 'react';

import './TodoItem.css';
import { localStorageDataContext } from './../../../../contexts/LocalStorageDataProvider';


export const TodoItem = ({id, description, title, isCompleted, groupID}) => {
    const { feature: { removeTodo } } = useContext(localStorageDataContext);
    return (
        <div className="todo-item">
                <p> {title} </p>
                <div className="menu">
                    <button>E</button>
                    <button onClick={() => removeTodo(groupID,id)}>D</button>
                </div>
            </div>
        
    )
}