import React, { useState, useEffect, useContext, useCallback } from 'react';
import uuid from 'uuid';

const createDefaultDay = () => (new Date().setHours(1, 0, 0, 0));
const createOptionDay = (d, m, y) => (new Date(y, m, d).setHours(1, 0, 0, 0));
const createTodo = (title) => ({
    id: uuid(),
    title,
    description: 'bla bla bla...',
    isCompleted: false
})
const createTodoGroup = () => ({
    isValid: true,
    todos: [
        {
            id: uuid(),
            title: 'Do something',
            description: 'bla bla bla...',
            isCompleted: false
        }
    ]
})
const localStorageKey = 'TodoApp';
const sesionStorageKey = 'inputTodo';

const mockupData = {
    title: 'Todos With Hooks',
    todosGroup: {
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

export const LocalStorageDataProvider = ({ children }) => {
    const [data, setData] = useState(useContext(localStorageDataContext));
    // setup default localStorage
    useEffect(() => {
        const dataLocalStorage = localStorage.getItem(localStorageKey);
        if (dataLocalStorage)
            setData(JSON.parse(dataLocalStorage));
        else
            localStorage.setItem(localStorageKey, JSON.stringify(data));
    }, []);
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(data))
    }, [data])
    const [inputTodo, setInputTodo] = useState('')
    //setup default sessionStorage
    useEffect(() => {
        const dataSessionStorage = sessionStorage.getItem(sesionStorageKey);
        if (dataSessionStorage)
            setInputTodo(dataSessionStorage);
        else
            sessionStorage.setItem(sesionStorageKey, inputTodo);
    }, []);
    useEffect(() => {
        sessionStorage.setItem(sesionStorageKey, inputTodo)
    }, [inputTodo])
    //feature
    //-----Add todo group  for today
    const addTodoGroupForToday = useCallback(
        (e, day = createDefaultDay()) => {
            if (typeof day === 'object') {
                const { d, m, y } = day;
                day = createOptionDay(d, m, y);
            }
            // console.log(createOptionDay(1,1,2019))
            if (data.todosGroup[day] === undefined && day >= createDefaultDay()) {
                setData({
                    title: data.title,
                    todosGroup: {
                        ...data.todosGroup,
                        [day]: createTodoGroup()
                    }
                })
                return true;
            }
            return false
        }, [data]
    )
    //-----Remove todo group
    const removeTodoGroup = (groupID) => {
        const clonedtodosGroup = { ...data.todosGroup };
        delete clonedtodosGroup[groupID];
        setData({
            title: data.title,
            todosGroup: { ...clonedtodosGroup }
        })
    }
    //-----Edit todo
    const [editModalValue, setEditModalValue] = useState(null);
    const toggleEditMode = (groupID, todo, coordinate) => {
        if(groupID === null)
            setEditModalValue(null);
        else 
            setEditModalValue({groupID, todo, coordinate})
    }
    const editTodo = useCallback( 
        (groupID, editedTodo) => {
            const index = data.todosGroup[groupID].todos.findIndex(todo => todo.id === editedTodo.id);
            setData({
                title: data.title,
                todosGroup: {
                    ...data.todosGroup,
                    [groupID]: {
                        isValid: data.todosGroup[groupID].isValid,
                        todos: [
                            ...data.todosGroup[groupID].todos.slice(0, index),
                            editedTodo,
                            ...data.todosGroup[groupID].todos.slice(index + 1)
                        ]
                    }
                }
            })
        }, [data]
    )
    //----------Change todo status
    const changeTodoStatus = useCallback(
        (groupID, selectedTodo) => {
            const index = data.todosGroup[groupID].todos.findIndex(todo => todo.id === selectedTodo.id);
            setData({
                title: data.title,
                todosGroup: {
                    ...data.todosGroup,
                    [groupID]: {
                        isValid: data.todosGroup[groupID].isValid,
                        todos: [
                            ...data.todosGroup[groupID].todos.slice(0, index),
                            {...selectedTodo,
                                isCompleted: !selectedTodo.isCompleted},
                            ...data.todosGroup[groupID].todos.slice(index + 1)
                        ]
                    }
                }
            })
        }, [data]
    )
    //-----Add todo
    const [addModelGroupID, setAddModelGroupID] = useState(null);
    const checkAddModelGroupID = (groupID) => {
        setAddModelGroupID(groupID)
    };
    const addTodo = useCallback(
        (groupID, value = inputTodo) => {
            if (value.trim() !== '') {
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
            setData({
                title: data.title,
                todosGroup: {
                    ...data.todosGroup,
                    [groupID]: {
                        isValid: data.todosGroup[groupID].isValid,
                        todos: [
                            ...data.todosGroup[groupID].todos.slice(0, index),
                            ...data.todosGroup[groupID].todos.slice(index + 1)
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
            value={{
                data: { ...data, inputTodo }, feature: {
                    // handle todo group 
                    addTodoGroupForToday,
                    removeTodoGroup,
                    //edit todo
                    editModalValue,
                    toggleEditMode,
                    editTodo,
                    changeTodoStatus,
                    //add todo
                    addModelGroupID,
                    checkAddModelGroupID,
                    addTodo,
                    changeInputTodo,
                    //remove todo
                    removeTodo
                }
            }}
        >
            {/* <button onClick={() => setData({...data, title: 'kakak'})}>change </button> */}
            {children}
        </localStorageDataContext.Provider>
    )
} 