import React, { useContext } from 'react';

import './Header.css'
import { localStorageDataContext} from './../../contexts/LocalStorageDataProvider';

export const Header = () => {
    const { data: {title} } = useContext(localStorageDataContext) 
    const handleOnDragStart = () => {
        console.log('start')
    }
    return (
        <header onDragStart={handleOnDragStart} >
            <p draggable={true}  className="title">
                {title}
            </p>
        </header>
    )
}