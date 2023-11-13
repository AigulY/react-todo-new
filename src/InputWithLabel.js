import React, { useRef, useEffect } from 'react';

const InputWithLabel = (props) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });
    
    return (
        <>
            <label htmlFor={props.id}>{props.children}</label>
            <input 
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                ref={inputRef}
            />
        </>
    );
};

export default InputWithLabel;