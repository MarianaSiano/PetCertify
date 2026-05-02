import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glass = false }) => {
    return (
        <div className={`rounded-3xl shadow-xl overflow-hidden ${glass ? 'glass' : 'bg-white border-2 border-slate-50'} ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`px-8 py-6 border-b border-slate-50 ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`px-8 py-8 ${className}`}>{children}</div>
);