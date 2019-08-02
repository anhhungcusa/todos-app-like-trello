import React, { useState, useEffect, useContext, useRef } from 'react' ;

import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider'; 
import './AddTodo.css';

export const AddTodo = ({groupID}) => {
    const { data: {inputTodo}, feature: {changeInputTodo, addTodo} } = useContext(localStorageDataContext);
    const [value, setValue] = useState(inputTodo);
    useEffect(() => {
        const changeInputTime = setTimeout(() => {
            changeInputTodo(value);
        }, 200);
        return () => clearTimeout(changeInputTime)
    }, [value])
    useEffect(() => setValue(inputTodo), [inputTodo])

    const textareaRef = useRef(null);
    useEffect(() => {
        textareaRef.current.focus();
    }, [])

    const handleValueChange = (e) => setValue(e.target.value);
    const handleKeyUp = (e) => {
        if(e.keyCode === 13) {
            addTodo(groupID,value.replace( /\r?\n/gi, ' ' ));
            setValue('');
        }
    }
    
    return (
        <div className="add-todo d-flex-jty-center">
                <textarea 
                    value={value}
                    onChange={handleValueChange}
                    onKeyUp={handleKeyUp}
                    ref={textareaRef}
                    placeholder="Enter task"
                />
        </div>
    )
}