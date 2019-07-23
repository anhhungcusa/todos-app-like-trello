import React, { useContext, useEffect, useState, useCallback} from 'react';

import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider'
import { withGroupCard } from './../../HOCs/withGroupCard/withGroupCard'
import { TodoGroup } from './TodoGroup/TodoGroup'

import './GroupList.css';

const TodoGroupwithGroupCard = withGroupCard(TodoGroup, '#dfe1e6') 

export const GroupList = (props) => {
    const { data:{todosGroup}, feature: { addTodo } } = useContext(localStorageDataContext); 
    const [todosGroupKey, settodosGroupKey] = useState([]);
    useEffect(() => {
        settodosGroupKey(Object.keys(todosGroup).sort());
    }, [todosGroup])

    

    // useEffect(() => {
    //     console.log(todosGroupKey,12);
    // })

    return (
        <div className="group-list">
            {todosGroupKey.map(key => {
                return(
                <TodoGroupwithGroupCard key={key} groupID={key} addTodo={addTodo}  {...todosGroup[key]} />)
                })}
        </div>
    )
} 