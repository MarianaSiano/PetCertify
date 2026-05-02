import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 px-1">
                    {icon} {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 bg-white rounded-xl border-2 border-slate-100 focus:border-primary focus:ring-0 transition-all outline-none text-slate-900 placeholder:text-slate-400 ${className}`}
                {...props}
            />
        </div>
    );
};