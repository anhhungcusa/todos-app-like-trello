import React from 'react';

import './withCard.css'

export const withCard = (WrappedComponent, bgColor) => {
    return props => {
        return (
            <div className="card" style={{ backgroundColor: props.activeColor || bgColor || '#f9f9f9'}}>
                <WrappedComponent {...props} />
            </div>
        )
    }
}

export const withCardHeader = (WrappedComponent) => {
    return props => {
        return (
            <div className='card-header'>

            </div>
        )
    }
}   



