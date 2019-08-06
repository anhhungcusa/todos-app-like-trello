import React, { useContext, useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { localStorageDataContext } from './../../../contexts/LocalStorageDataProvider';
import { AddTodo } from './../../AddTodo/AddTodo';
import { Button } from './../../Button/Button';
import { withCard } from './../../../HOCs/withCard/withCard';
import { getDDM } from './../../../utilities';
import { TodoItem } from './TodoItem/TodoItem';
import './TodoGroup.css';
const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;

    display: flex;   
    flex-direction: column;
`
const TaskList = styled.div`
padding: 8px;
transition: background-color 0.2s ease;
background-color: ${props =>
        props.isDraggingOver ? 'red' : 'blue'}
flex-grow: 1;
min-height: 100px;
`
const Title = styled.h3`
    padding: 8px;
`

const TodowithCard = withCard(TodoItem, '#fff')
export const TodoGroup = ({ groupID, isValid, todos = [] }) => {
    const { feature: { addModelGroupID, checkAddModelGroupID, removeTodoGroup } } = useContext(localStorageDataContext);
    const [isAddModel, setIsAddModel] = useState(false);
    useEffect(() => {
        if (addModelGroupID !== groupID)
            setIsAddModel(false);
    }, [addModelGroupID]);
    const closeAddmodel = () => {
        setIsAddModel(false);
        checkAddModelGroupID(null);
    }
    const handleAddTodoBtn = () => {
        switch (addModelGroupID) {
            case groupID:
                setIsAddModel(true);
                break;
            default:
                checkAddModelGroupID(groupID);
                setIsAddModel(true)
                break;
        }
    }

    return (
        <Container>
            <Title>{getDDM(groupID)}</Title>
            <Droppable  droppableId={groupID} type="TASK" >
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {todos.map((task, index) => (
                                <TodoItem key={task.id} groupID={groupID} todo={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
            <div className="group-card-footer">
                {isAddModel ? <AddTodo groupID={groupID} closeAddmodel={closeAddmodel} />
                            : <Button onClick={handleAddTodoBtn}>Add new task</Button>}
            </div>
        </Container>
        // <div>
        //     <div className="group-card-header">
        //     {getDDM(groupID)}
        //         <Button className="ab-top-r" onClick={() => removeTodoGroup(groupID)}>D</Button>
        //     </div>
        //     <div className="group-card-body">
        //         <div className="todo-group">
        //             <Droppable droppableId={groupID} type="TASK" >
        //                 {(provided, snapshot) => (
        //                     <TaskList
        //                         ref={provided.innerRef}
        //                         {...provided.droppableProps}
        //                         isDraggingOver={snapshot.isDraggingOver}
        //                     >
        //                         {todos.map((task, index) => (
        //                             <div key={task.id} className=" d-flex-jty-center">
        //                                 <TodowithCard groupID={groupID} todo={task} index={index} />
        //                             </div>
        //                         ))}
        //                         {provided.placeholder}
        //                     </TaskList>
        //                 )}
        //             </Droppable>

        //         </div>
        //     </div>  
            // <div className="group-card-footer">
            //     {isAddModel ? <AddTodo groupID={groupID} closeAddmodel={closeAddmodel} />
            //                 : <Button onClick={handleAddTodoBtn}>Add new task</Button>}
            // </div>
        // </div>

    )
}