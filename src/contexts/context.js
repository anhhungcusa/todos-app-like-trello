import React from 'react';

export const testContext = React.createContext(1);

export const TestProvider = ({ children }) => (
    <testContext.Provider value={ {a: 3}}>
        {children}
    </testContext.Provider>
)