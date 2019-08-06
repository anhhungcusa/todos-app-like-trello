import React from 'react';

import './withGroupCard.css';

export const withGroupCard = (WrappedComponent, bgColor) => {
    return (props) => {
        return (
                <div className="group-card" style={{backgroundColor: bgColor}} >
                    <WrappedComponent {...props} />
                </div>
            )
    } 
}
