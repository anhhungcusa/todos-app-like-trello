import React from 'react';

import './withCard.css';

export const withCard = (WrappedComponent, backgroundColor, width) => props => (
    <div className="todo-card" style={{ backgroundColor, width }}>
        <WrappedComponent {...props} />
    </div>
) 