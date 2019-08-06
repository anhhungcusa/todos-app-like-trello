import React, { useContext, useEffect, useState, useRef} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider'
import { withGroupCard } from './../../HOCs/withGroupCard/withGroupCard'
import { TodoGroup } from './TodoGroup/TodoGroup'

import './GroupList.css';
import { AddTodoGroup } from '../AddTodoGroup/AddTodoGroup';

const TodoGroupwithGroupCard = withGroupCard(TodoGroup, 'red') 

export const GroupList = (props) => {
    const { data:{ todosGroup }, feature: { addTodoGroupForToday, moveTodo, moveTodoToAnotherList } } = useContext(localStorageDataContext); 
    const [todosGroupKey, settodosGroupKey] = useState([]);
    useEffect(() => {
        settodosGroupKey(Object.keys(todosGroup).sort());
    }, [todosGroup]);

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
    };
    const onDragEnd = ({destination, source, draggableId }) => {
        if(!destination)
            return;
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        if(destination.droppableId === source.droppableId) {
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
                    return(
                        <TodoGroup key={`.123${key}`} groupID={key}  {...todosGroup[key]} />
                    )
                })}
            </DragDropContext>
                <div>
                    <div className="group-card">
                        <AddTodoGroup addTodoGroupForToday={addTodoGroupForToday}
                            addTodoGroupForOptionDate={addTodoGroupForOptionDate}
                            inputDateRef={inputDateRef} />
                    </div>
                    {/* <button onClick={() => moveTodo('1564941600000', 0, 2)}>move</button>
                    <button onClick={() => moveTodoToAnotherList('1564941600000','1565028000000', 0, 3)}>move to another list</button> */}
                </div>
            </div>
        </main>
    )
} 