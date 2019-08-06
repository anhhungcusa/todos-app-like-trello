import React from 'react';

export const Button = ({ onClick, children, className }) => (
    <button className={`Button ${className || ''}`} onClick={onClick}>
        {children}
    </button>
)