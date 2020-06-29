import React, { useState, useEffect, useContext, useCallback } from 'react';

import { mockupData } from './../constant/mockData';
import { createDefaultDay, createOptionDay, createTodo, createTodoGroup } from './../utilities'

const localStorageKey = 'TodoApp';
const sesionStorageKey = 'inputTodo';

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
            

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Dnd : move todo
    const moveTodo = (groupID, origin, destination) => {
        const newTodos = Array.from(data.todosGroup[groupID].todos);
        newTodos.splice(origin, 1)
        // debugger
        newTodos.splice(destination, 0, {...data.todosGroup[groupID].todos[origin]})
        // debugger
        setData({
            title: data.title,
            todosGroup: {
                ...data.todosGroup,
                [groupID]: {
                    isValid: data.todosGroup[groupID].isValid,
                    todos: [...newTodos]
                }
            }
        })
    }
    
    const moveTodoToAnotherList = (originGroupID, destinationGroupID, origin, destination) => {
        //delete todo of origin
        // debugger;
        const newTodosOfOrigin = Array.from(data.todosGroup[originGroupID].todos);
        newTodosOfOrigin.splice(origin, 1);
        //insert todo into destination
        const newTodosOfDestination = Array.from(data.todosGroup[destinationGroupID].todos);
        newTodosOfDestination.splice(destination, 0, data.todosGroup[originGroupID].todos[origin]);
        setData({
            title: data.title,
            todosGroup: {
                ...data.todosGroup,
                [originGroupID]: {
                    isValid: data.todosGroup[originGroupID].isValid,
                    todos: [...newTodosOfOrigin]
                },
                [destinationGroupID]: {
                    isValid: data.todosGroup[destinationGroupID].isValid,
                    todos: [...newTodosOfDestination]
                }
            }
        })

    }

    const changeInputTodo = (inputTodo) => {
        setInputTodo(inputTodo)
    }

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
                    removeTodo,
                    //Dnd
                    moveTodo,
                    moveTodoToAnotherList
                }
            }}
        >
            {children}
        </localStorageDataContext.Provider>
    )
} 