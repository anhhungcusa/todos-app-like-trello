import React, { useState, useEffect, useContext } from 'react';

import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider';
import { createDefaultDay } from './../../utilities';
import { Button } from '../Button/Button';

export const AddTodoGroup = ({addTodoGroupForToday, addTodoGroupForOptionDate, inputDateRef}) => {
    const { data: { todosGroup } } = useContext(localStorageDataContext);
    const [isHasTodoforToday, setIsHasTodoforToday] = useState(false);
    useEffect(() => {
        if(todosGroup[createDefaultDay()] !== undefined) {
            setIsHasTodoforToday(true)
        } else {
            setIsHasTodoforToday(false);
        }
    }, [todosGroup])
    return (
        <>
            { !isHasTodoforToday &&  <Button onClick={addTodoGroupForToday}>Add todo list for today</Button>}
            <input ref={inputDateRef} type="date" />
            <Button onClick={addTodoGroupForOptionDate}>Add todo list</Button>
        </>
    )
}