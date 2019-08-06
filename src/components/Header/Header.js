import React, { useContext } from 'react';

import './Header.css'
import { localStorageDataContext} from './../../contexts/LocalStorageDataProvider';

export const Header = () => {
    const { data: {title} } = useContext(localStorageDataContext) 
    return (
        <header  >
            <p draggable={true} className="title">
                {title}
            </p>
        </header>
    )
}