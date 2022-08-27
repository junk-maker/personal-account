import React from 'react';

interface InputProps {
    id: string;
    type: string;
    value: string;
    className: string;
    placeholder: string;
    autoComplete: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = ({id, type, value,  onChange, className, autoComplete, placeholder}: InputProps) => {
   
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
            autoComplete={autoComplete}
        />
    );
};


export default Input;