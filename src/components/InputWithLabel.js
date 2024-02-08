import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    placeholder: PropTypes.string
};

export default InputWithLabel;