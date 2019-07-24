import React, { useState, useContext } from 'react';
import classnames from 'classnames';

import './TodoItem.css';
import { localStorageDataContext } from './../../../../contexts/LocalStorageDataProvider';


export const TodoItem = ({todo, groupID}) => {
    const {id, description, title, isCompleted} = todo;
    const { feature: { removeTodo, changeTodoStatus } } = useContext(localStorageDataContext);
    return (
        <div 
        className={classnames("todo-item", {"completed": isCompleted})}
        >
            <div className="w-100-h-100"   onClick={() => changeTodoStatus(groupID,todo)}>
                <p> {title} </p>
            </div>

                <div className="menu">
                    <button onClick={() => removeTodo(groupID,id)}>E</button>
                    <button onClick={() => removeTodo(groupID,id)}>D</button>
                </div>
            </div>
        
    )
}