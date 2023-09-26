"use client";
import React from 'react'
import Wrapper from '../Common/Wrapper/Wrapper'
import Logo from '../Logo/Logo'
import NavLink from '../Common/NavLink/NavLink'
import Search from '../Search/Search';
import Account from '../Account/Account';
import { useMobileNav } from '@/contexts/MobileNavContext';
import { useScroll, useMotionValueEvent } from "framer-motion"
import { HiBars3 } from 'react-icons/hi2';
interface Props {

}

export const navMenu = [
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/blogs",
        name: "Blogs"
    },
    {
        path: "/tags",
        name: "Tags"
    },
    {
        path: "/about-me",
        name: "About me"
    },
    {
        path: "/contact",
        name: "Contact",
    }
]

const Navbar = ({ }: Props) => {
    const navbarRef = React.useRef<HTMLDivElement | null>(null)
    const mobileNav = useMobileNav()
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!navbarRef.current) return
        if (latest > 100) {
            navbarRef.current.classList.add("sticky-bar")
        }
        else {
            navbarRef.current.classList.remove("sticky-bar")
        }
    })
    return (

        <nav
            ref={navbarRef}
            className='dark:bg-on_dark_body_bg transition-all bg-on_light_body_bg py-2 sm:py-[15px] mt-[15px]'
        >
            <Wrapper className='relative flex items-center justify-between'>
                <Logo />
                <div className='lg:flex items-center flex-nowrap space-x-4 font-noto_sans hidden  '>
                    {
                        navMenu.map((items, idex) => (
                            <NavLink exact={items.path === '/'} key={items.name} href={items.path} className='px-4 text-base transition-all hover:text-on_link_active
                            text-on_text_gray_2 font-normal [&.active]:text-on_link_active
                            dark:text-on_dark_text_gray dark:hover:text-on_link_active'>
                                {items.name}
                            </NavLink>
                        ))
                    }
                </div>

                <div className='flex items-center justify-between gap-4 ml-auto lg:ml-0'>
                    <Search />
                    <Account />
                    <button className='flex items-center text-on_dark_text_gray lg:hidden' onClick={() => mobileNav?.open()}>
                        <HiBars3 className='w-9 h-9' />
                    </button>
                </div>

            </Wrapper>
        </nav>

    )
}

export default Navbar