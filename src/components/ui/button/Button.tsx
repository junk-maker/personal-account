import React from 'react';

interface ButtonProps {
    className: string;
    onClick: () => void;
    children: React.ReactNode;
};

const Button = ({onClick, children, className}: ButtonProps) => {
    return (
        <button 
            onClick={onClick}
            className={className}
        >{children}</button>
    );
};

export default Button;