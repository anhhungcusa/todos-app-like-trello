import React, { useContext, useRef, useCallback } from 'react';
import classnames from 'classnames';

import './TodoItem.css';
import { localStorageDataContext } from './../../../../contexts/LocalStorageDataProvider';

const calculatePosition = (currentRef) => {
    let top = 0, left = 0;
    (function recursion(value) {
        if (value.offsetParent !== null) {
            top += value.offsetTop;
            left += value.offsetLeft;
            recursion(value.offsetParent);
        }
    })(currentRef)
    return [top, left];
}

export const TodoItem = ({todo, groupID}) => {
    const {id, title, isCompleted} = todo;
    const { feature: { removeTodo, changeTodoStatus } } = useContext(localStorageDataContext);
    const divRef = useRef(null)
    const editBtn = (e) => {
        let [top, left] = calculatePosition(divRef.current);
        console.log(top , left, divRef)
    }
    return (
        <div ref={divRef} className="todo-item">
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