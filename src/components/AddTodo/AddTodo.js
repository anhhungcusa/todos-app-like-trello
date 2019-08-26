import React, { useState, useEffect, useContext, useRef } from 'react' ;

import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider'; 
import './AddTodo.css';
import { Button } from '../Button/Button';

export const AddTodo = ({groupID, closeAddmodel}) => {
    const { data: {inputTodo}, feature: {changeInputTodo, addTodo} } = useContext(localStorageDataContext);
    const [value, setValue] = useState(inputTodo);
    useEffect(() => {
        const changeInputTime = setTimeout(() => {
            changeInputTodo(value);
        }, 200);
        return () => clearTimeout(changeInputTime)
    }, [value, changeInputTodo])
    useEffect(() => setValue(inputTodo), [inputTodo])

    const textareaRef = useRef(null);
    useEffect(() => {
        textareaRef.current.focus();
    }, [])

    const handleValueChange = (e) => setValue(e.target.value);
    const handleKeyUp = (e) => {
        // debugger;
        switch (e.keyCode) {
            case 13:
                addTodo(groupID,value.replace( /\r?\n/gi, '' ));
                setValue('');
                break;
            case 27:
                closeAddmodel();
                break;
            default:
                break;
        }
    }
    
    return (
        <>
            <div className="add-todo d-flex-jty-center">
                    <textarea 
                        value={value}
                        onChange={handleValueChange}
                        onKeyUp={handleKeyUp}
                        ref={textareaRef}
                        placeholder="Enter task"
                    />
            </div>
            <Button className="da" onClick={() => addTodo(groupID)} >Add task</Button>
            <Button onClick={closeAddmodel}>X</Button>
        </>
    )
}