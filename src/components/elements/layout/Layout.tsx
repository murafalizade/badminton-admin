import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../app/hooks/auth'
import { Sidebar } from '../sidebar/Sidebar'
import './Layout.scss'

type Props = {
    // addingType is argument that shows it routes which page
    addingType: string,
    children?: JSX.Element | JSX.Element[] | string
}

export const Layout = ({ addingType, children }: Props) => {

    // Protect routering 
    const navigate = useNavigate();

    const { authed } = useAuth();

    useEffect(() => {
        if (!authed)
            navigate('/')
    }, [])

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard-body'>
                <div className='dashboard-button'>
                    <Button href={`/dashboard/${addingType}`}>+ Əlavə et</Button>
            </div>
            {children}
        </div>
        </div >
    )
}
