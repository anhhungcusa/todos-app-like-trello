import React, { useContext, useRef } from 'react';
import uuid from 'uuid';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import classnames from 'classnames';

import './TodoItem.css';
import { localStorageDataContext } from './../../../../contexts/LocalStorageDataProvider';

import { } from './../../../../utilities'
import { Button } from '../../../Button/Button';

const Container = styled.div`
    border: 1px solid lightgrey;
    position: relative;
    overflow-wrap: break-word; 
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props =>
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging
                ? 'lightgreen'
                : 'white'};
    : hover a {
        color: red;
    }
`;
const Menu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 2px;
    right: 4px;
    visibility: hidden ;
    z-index: 2;
    ${Container}: hover & {
        visibility: visible;
    }
`;

export const TodoItem = ({ todo, groupID, index }) => {
    const { id, title, isCompleted } = todo;
    const { feature: { removeTodo, changeTodoStatus, toggleEditMode } } = useContext(localStorageDataContext);
    const todoItemRef = useRef(null)
    const editBtn = () => {
        const { top, left } = todoItemRef.current.getBoundingClientRect();
        toggleEditMode(groupID, todo, { top, left })
    }
    // const isDragDisabled = id === '239e4db6-76d1-4578-af22-4d2e8a75e6e2';
    return (
        <Draggable
            draggableId={id}
            index={index}
        // isDragDisabled={isDragDisabled}
        // ref={todoItemRef}
        >
            {(provided, snapshot) => (
                <div ref={todoItemRef}> 
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    // isDragDisabled={isDragDisabled}
                    >
                        <div
                            className={classnames("w-100-h-100", { "completed": isCompleted })}
                            onClick={() => changeTodoStatus(groupID, todo)}>
                            <p> {title} </p>
                        </div>
                        <Menu >
                            <Button onClick={editBtn}>E</Button>
                            <Button onClick={() => removeTodo(groupID, id)}>D</Button>
                        </Menu>
                    </Container>
                </div>
            )}
        </Draggable>

    )
}