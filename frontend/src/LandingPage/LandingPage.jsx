import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function LandingPage() {
    return (
        <>
            <Header />
            <Box>
                <Outlet />
            </Box>
        </>
    )
}
