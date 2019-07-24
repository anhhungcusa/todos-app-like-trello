import React, { useContext, useEffect, useState, useRef} from 'react';

import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider'
import { withGroupCard } from './../../HOCs/withGroupCard/withGroupCard'
import { TodoGroup } from './TodoGroup/TodoGroup'

import './GroupList.css';

const TodoGroupwithGroupCard = withGroupCard(TodoGroup, '#dfe1e6') 

export const GroupList = (props) => {
    const { data:{todosGroup}, feature: { addTodo, addTodoGroupForToday  } } = useContext(localStorageDataContext); 
    const [todosGroupKey, settodosGroupKey] = useState([]);
    useEffect(() => {
        settodosGroupKey(Object.keys(todosGroup).sort());
    }, [todosGroup])
    // useEffect(() => {
    //     console.log(todosGroupKey,12);
    // })
    const inputDateRef = useRef(null);
    const addTodoGroupForOptionDate = (e) => {
        const { current: {value} } = inputDateRef
        if(value !== '') {
            const date = new Date(value);
            addTodoGroupForToday(e, {
                d: date.getDate(),
                m: date.getMonth(),
                y: date.getFullYear()
            })
        }
    }

    return (
        <main>
            <div className="group-list">
                {todosGroupKey.map(key => {
                    return(
                    <div  key={key}>
                        <TodoGroupwithGroupCard groupID={key} addTodo={addTodo}  {...todosGroup[key]} />
                    </div>)
                })}
                <div>
                    <div className="group-card">
                        <button onClick={(e) => addTodoGroupForToday(e)}>Add todo list for today</button>
                        <input ref={inputDateRef} type="date" />
                        <button onClick={addTodoGroupForOptionDate}>Add todo list</button>
                    </div>
                </div>
            </div>
        </main>
    )
} 