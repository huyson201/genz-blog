"use client";


import React, { useState } from 'react'
import Navbar from '../Navbar'
import MobileNavbar from '../MobileNavbar/MobileNavbar'

type Props = {}

const NavbarWrapper = (props: Props) => {
    const [showNavMobile, setShowNavMobile] = useState(false)
    return (
        <>
            <Navbar onRequestOpenNavMobile={() => setShowNavMobile(true)} />
            <MobileNavbar open={showNavMobile} onRequestClose={(() => setShowNavMobile(false))} />
        </>
    )
}

export default NavbarWrapper