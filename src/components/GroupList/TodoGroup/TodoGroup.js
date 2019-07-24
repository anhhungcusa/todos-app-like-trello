import React, { useContext, useState, useEffect } from 'react';

import { TodoItem } from './TodoItem/TodoItem';
import { withCard } from './../../../HOCs/withCard/withCard'
import './TodoGroup.css';

const TodowithCard = withCard(TodoItem, '#fff')
export const TodoGroup = ({groupID, isValid, todos = []}) => {
    return (
        <div className="todo-group">
            {todos.map((task,index) => (
                <div key={task.id} className=" d-flex-jty-center">
                    <TodowithCard   groupID={groupID} todo={task} />
                </div>
            ))}
        </div>
    )
}