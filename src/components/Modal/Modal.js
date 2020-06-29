import React, { useContext } from 'react';

import './Modal.css';
import { localStorageDataContext } from './../../contexts/LocalStorageDataProvider'
import { EditModal } from './EditModal/EditModal';

export const Modal = (props) => {
    const {feature: { editModalValue, editTodo, toggleEditMode }} = useContext(localStorageDataContext);

    return (
        <>
            {editModalValue && <EditModal editModalValue={editModalValue} editTodo={editTodo} toggleEditMode={toggleEditMode} />}
        </>
    )
} 
