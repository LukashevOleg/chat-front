import React from 'react';
import './Input.css'

const Input = ({label, ...props}) => {
    return (
        <div className="input-with-label">
            <label htmlFor={props.id}>{label}</label>
            <input className="input" {...props}/>
        </div>
    );
};

export default Input;