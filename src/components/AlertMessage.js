import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './AlertMessage.css'; 

const AlertMessage = ({ type, message, resetMessage }) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            resetMessage();
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [resetMessage]);

    return (
        <div className={`alertMessage ${type}`}>
            {message}
        </div>
    );
};

AlertMessage.propTypes = {
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
    resetMessage: PropTypes.func.isRequired,
};

export default AlertMessage;