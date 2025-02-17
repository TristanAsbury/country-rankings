import React, { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: ReactNode;
}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <div>
            <input
                className={`border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                {...props}
            />
        </div>

    );
};