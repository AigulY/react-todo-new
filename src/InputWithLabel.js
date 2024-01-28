import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ id, type, name, value, onChange, placeholder, children }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input 
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                ref={inputRef}
            />
        </>
    );
};

export default InputWithLabel;