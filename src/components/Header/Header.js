import React, { useState, useEffect, useContext } from 'react';

import './Header.css'
import { localStorageDataContext} from './../../contexts/LocalStorageDataProvider';
import { testContext, testProvider }  from './../../contexts/context'

export const Header = () => {
    const [title, setTitle] = useState(null)
    // useEffect(() => setTitle(), [])
    const context = useContext(localStorageDataContext) 
    useEffect(() => {
        if(context)
            setTitle(context.data.title)
    }, [context ? context.data.title : title]);

    return (
        <header >
            <p className="title">
                {title}
            </p>
        </header>
    )
}