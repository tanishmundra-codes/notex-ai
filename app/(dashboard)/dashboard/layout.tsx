import React from 'react'
import Sidebar from '../componets/sidebar'
import Header from '../componets/header'

function Dashboardlayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className='md:w-64 fixed h-screen'>
                <Sidebar />
            </div>
            <div className='md:ml-64'>
                <Header />
                <div>
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default Dashboardlayout