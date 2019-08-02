import React, { useContext, useRef, useCallback } from 'react';
import classnames from 'classnames';

import './TodoItem.css';
import { localStorageDataContext } from './../../../../contexts/LocalStorageDataProvider';

import {  } from './../../../../utilities'

export const TodoItem = ({todo, groupID}) => {
    const {id, title, isCompleted} = todo;
    const { feature: { removeTodo, changeTodoStatus, toggleEditMode  } } = useContext(localStorageDataContext);
    const todoItemRef = useRef(null)
    const editBtn = (e) => {
        const { top, left } = todoItemRef.current.getBoundingClientRect();
        toggleEditMode(groupID, todo, { top , left})
    }
    return (
        <div ref={todoItemRef} className="todo-item">
            <div 
            className={classnames("w-100-h-100", {"completed": isCompleted})}
            onClick={() => changeTodoStatus(groupID,todo)}>
                <p> {title} </p>
            </div>
            <div className="menu">
                <button  onClick={editBtn}>E</button>
                <button   onClick={() => removeTodo(groupID,id)}>D</button>
            </div>
        </div>
        
    )
}