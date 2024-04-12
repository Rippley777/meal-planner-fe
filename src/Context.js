import React from 'react';

const MyContext = React.createContext();

export default MyContext;

export const MyProvider = ({ children }) => {

    const [value, setValue] = React.useState({});
    const [formValue, setFormValue] = React.useState({});


    return (
        <MyContext.Provider value={{ value, setValue, formValue, setFormValue }}>
            {children}
        </MyContext.Provider>
    );
};