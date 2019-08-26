import React, { useContext, useEffect, useState, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import './GroupList.css';
import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider'
import { TodoGroup } from './TodoGroup/TodoGroup';
import { AddTodoGroup } from '../AddTodoGroup/AddTodoGroup';
import { withCard } from './../../HOCs/withCard/withCard';
import { createDefaultDay } from './../../utilities/index'
// import { Form } from '../Form/Form';

const TodoGroupwithCard = withCard(TodoGroup);

export const GroupList = (props) => {
    const { data: { todosGroup }, feature: { addTodoGroupForToday, moveTodo, moveTodoToAnotherList } } = useContext(localStorageDataContext);
    const [todosGroupKey, settodosGroupKey] = useState([]);
    useEffect(() => {
        settodosGroupKey(Object.keys(todosGroup).sort());
    }, [todosGroup]);

    const inputDateRef = useRef(null);
    const addTodoGroupForOptionDate = (e) => {
        const { current: { value } } = inputDateRef
        if (value !== '') {
            const date = new Date(value);
            addTodoGroupForToday(e, {
                d: date.getDate(),
                m: date.getMonth(),
                y: date.getFullYear()
            })
        }
    };
    const onDragEnd = ({ destination, source }) => {
        if (!destination)
            return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        if (destination.droppableId === source.droppableId) {
            moveTodo(source.droppableId, source.index, destination.index);
            return;
        }
        // debugger;
        // moving from one list to another
        moveTodoToAnotherList(source.droppableId, destination.droppableId, source.index, destination.index);
    }

    return (
        <main>
            <div className="group-list">
                <DragDropContext onDragEnd={onDragEnd}>
                    {todosGroupKey.map(key => {
                        return (
                            <div key={key}>
                                <TodoGroupwithCard
                                    activeColor={(key === `${createDefaultDay()}` ? '#188038' : false)}
                                    groupID={key}  {...todosGroup[key]} />
                            </div>
                        )
                    })}
                </DragDropContext>
                <div>
                    <div className="group-card">
                        <AddTodoGroup addTodoGroupForToday={addTodoGroupForToday}
                            addTodoGroupForOptionDate={addTodoGroupForOptionDate}
                            inputDateRef={inputDateRef} />
                    </div>
                </div>
            </div>
        </main>
    )
}


// import('./../Form/Form').then(({ Form }) => <Form />) 