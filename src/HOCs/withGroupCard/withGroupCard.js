import React, { useState, useContext, useEffect } from 'react';

import './withGroupCard.css';
import { AddTodo } from './../../components/AddTodo/AddTodo';
import { withCard } from './../withCard/withCard';
import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider';

const dayList = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy' ]

const getDDM = (time) => {
    const thisYear = (new Date()).getFullYear();
    const date = new Date(time - 0);
    let timeYear = date.getFullYear();
    if( timeYear >  thisYear){ 
        timeYear = `, Năm ${timeYear}`;}
    else {
        timeYear = '';
    }
    return `${dayList[date.getDay()]}, Ngày ${date.getDate()}, Tháng ${date.getMonth() + 1}${timeYear}`;
}

const AddTodowithCard = withCard(AddTodo,'#fff','250px');

export const withGroupCard = (WrappedComponent, bgColor) => {
    return (props) => {
        const { feature: { addModelGroupID, checkAddModelGroupID, removeTodoGroup } } = useContext(localStorageDataContext);
        const [isAddModel, setIsAddModel] = useState(false);
        useEffect(() => {
            if(addModelGroupID !== props.groupID)
                setIsAddModel(false);
            // console.log(isAddModel, addModelGroupID)
        }, [addModelGroupID])

        const closeAddmodel = () => {
            setIsAddModel(false);
            checkAddModelGroupID(null);
        }
        const handleAddTodoBtn = () => {
            switch (addModelGroupID) {
                case props.groupID:
                    setIsAddModel(true);
                    break;
                // case null:
                //     checkAddModelGroupID(props.groupID);
                //     setIsAddModel(true);
                //     break;
                default:
                    checkAddModelGroupID(props.groupID);
                    setIsAddModel(true)
                    break;
            }
        }

        return (
                <div className="group-card" style={{backgroundColor: bgColor}} >
                    <div>
                        <div className="group-card-header">
                            {getDDM(props.groupID)}
                            <button className="ab-top-r" onClick={() => removeTodoGroup(props.groupID)}>D</button>
                        </div>
                        <div className="group-card-body">
                            <WrappedComponent {...props} />
                        </div>
                        <div className="group-card-footer">
                            {!isAddModel && <button onClick={handleAddTodoBtn} > Add todo</button>}
                            {isAddModel && (
                            <>
                                <div className="d-flex-jty-center">
                                    <AddTodowithCard {...props} />
                                </div>
                                <button onClick={() => props.addTodo(props.groupID)}>Add todo</button>
                                <button onClick={closeAddmodel}>X</button>
                            </>
                            )}
                        </div>
                    </div>
            
                </div>
            )
    } 
}