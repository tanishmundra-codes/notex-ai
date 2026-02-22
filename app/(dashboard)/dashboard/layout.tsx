"use client";

import React, { useState } from 'react'
import Sidebar from '../componets/sidebar'
import Header from '../componets/header'

function Dashboardlayout({ children }: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar />
            </div>

            <div className="flex flex-col md:ml-64 min-h-screen">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Dashboardlayout