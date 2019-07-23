import React, { useState, useEffect, useContext, useCallback } from 'react';
import uuid from 'uuid';

const dayDefault = () => (new Date(new Date().setHours(1, 0, 0, 0))).getTime();
const createTodo = (title) => ({
    id: uuid(),
    title,
    description: 'bla bla bla...',
    isCompleted: false
})
const localStorageKey = 'TodoApp';
const sesionStorageKey = 'inputTodo';

const mockupData = {
    title: 'Todos With Hooks',
    todosGroup: {
        [dayDefault()]: {
            isValid: true,
            todos: [
                {
                    id: uuid(),
                    title: 'Do something',
                    description: 'bla bla bla...',
                    isCompleted: true
                }
            ]
        },
        '1563559200000': {
            isValid: true,
            todos: [
                {
                    id: uuid(),
                    title: 'Do something',
                    description: 'bla bla bla...',
                    isCompleted: true
                }
            ]
        }
    }
}


export const localStorageDataContext = React.createContext(mockupData);

export const LocalStorageDataProvider = ({children}) => {
    const [data, setData] = useState(useContext(localStorageDataContext));
    // setup default localStorage
    useEffect(() => {
        const dataLocalStorage = localStorage.getItem(localStorageKey); 
        if(dataLocalStorage) 
            setData(JSON.parse(dataLocalStorage));
        else 
            localStorage.setItem(localStorageKey, JSON.stringify(data));
    }, []);
    useEffect(() => {
        localStorage.setItem(localStorageKey,JSON.stringify(data))
    }, [data])
    const [inputTodo, setInputTodo] = useState('')
    //setup default sessionStorage
    useEffect(() => {
        const dataSessionStorage = sessionStorage.getItem(sesionStorageKey); 
        if(dataSessionStorage) 
            setInputTodo(dataSessionStorage);
        else 
            sessionStorage.setItem(sesionStorageKey,inputTodo);
    }, []);
    useEffect(() => {
        sessionStorage.setItem(sesionStorageKey,inputTodo)
    }, [inputTodo])
    //feature
    //-----Add group todo for today
    
    //-----Add todo
    const [addModelGroupID, setAddModelGroupID] = useState(null);
    const checkAddModelGroupID = (groupID) => {
        setAddModelGroupID(groupID)
    };
    const addTodo = useCallback(
        (groupID, value = inputTodo) => {
            if(value.trim() !== '') {
                setData({
                    title: data.title,
                    todosGroup: {
                        ...data.todosGroup,
                        [groupID]: {
                            isValid: data.todosGroup[groupID].isValid,
                            todos: [...data.todosGroup[groupID].todos, createTodo(value)]
                        } 
                    }
                });
                setInputTodo('');
            } else {
                console.log(inputTodo)
            }
        }, [data, inputTodo]
    )

    //----------Remove todo
    const removeTodo = useCallback(
        (groupID, todoID) => {
            const index = data.todosGroup[groupID].todos.findIndex(todo => todo.id === todoID);
            // console.log(index,todoID,
            //     [
            //     ...data.todosGroup[groupID].todos.slice(0,index)
            //     // ,...data.todosGroup[groupID].todos.slice(index+1,data.todosGroup[groupID].todos.length+1)
            //     ,...data.todosGroup[groupID].todos.slice(index+1,data.todosGroup[groupID].todos.length+1)
            // ]
            // )
            setData({
                title: data.title,
                    todosGroup: {
                        ...data.todosGroup,
                        [groupID]: {
                            isValid: data.todosGroup[groupID].isValid,
                            todos: [
                                ...data.todosGroup[groupID].todos.slice(0,index),
                                ...data.todosGroup[groupID].todos.slice(index+1)
                            ]
                        }  
                    }
            })
        }, [data]
    ) 
    const changeInputTodo = useCallback((inputTodo) => {
        setInputTodo(inputTodo)
    }, [inputTodo]) 

    // useEffect(() => console.log(data), [data])

    return (
        <localStorageDataContext.Provider 
        value={{data: {...data, inputTodo}, feature: {
            addModelGroupID,
            checkAddModelGroupID,
            addTodo,
            removeTodo,
            changeInputTodo
        }}}
        >
            {/* <button onClick={() => setData({...data, title: 'kakak'})}>change </button> */}
            {children}
        </localStorageDataContext.Provider>
    )
} 