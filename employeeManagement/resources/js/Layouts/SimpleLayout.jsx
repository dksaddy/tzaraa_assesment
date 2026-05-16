import React from 'react';

export default function SimpleLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-blue-600 text-white p-4 shadow">
                <div className="max-w-7xl mx-auto font-bold text-lg">
                    Employee Management System
                </div>
            </nav>
            {header && (
                <header className="bg-white border-b p-4 font-semibold text-xl text-gray-700">
                    <div className="max-w-7xl mx-auto">{header}</div>
                </header>
            )}
            <main className="py-6 max-w-7xl mx-auto px-4">{children}</main>
        </div>
    );
}
