"use client";
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import Wrapper from '../Common/Wrapper/Wrapper'
import Logo from '../Logo/Logo'
import NavLink from '../Common/NavLink/NavLink'
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline'
import ThemeModeToggle from '../ThemeModeToggle/ThemeModeToggle'
import Link from 'next/link'
import Search from '../Search/Search';
interface Props {
    onRequestOpenNavMobile: () => void
}

export const navMenu = [
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/about-me",
        name: "About me"
    }, {
        path: "/contact",
        name: "Contact",
    }
]

const Navbar = ({ onRequestOpenNavMobile }: Props) => {
    const navbarRef = React.useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const stickyEffect = () => {
            if (!navbarRef.current) return
            if (window.scrollY > 70) {
                if (navbarRef.current.classList.contains("sticky-bar")) return
                navbarRef.current.classList.add("sticky-bar")
            }
            else {
                navbarRef.current.classList.remove("sticky-bar")
            }
        }

        window.addEventListener("scroll", stickyEffect)
        return () => {
            window.removeEventListener("scroll", stickyEffect)
        }
    }, [])

    return (
        <nav
            onScroll={(e) => { }}
            ref={navbarRef}
            className={twMerge(` dark:bg-on_dark_body_bg transition-all bg-on_light_body_bg py-2 sm:py-[15px] mt-[15px]`)}>
            <Wrapper className='relative flex items-center justify-between'>
                <Logo />
                <div className='lg:flex items-center flex-nowrap space-x-4 font-noto_sans hidden  '>
                    {
                        navMenu.map((items, idex) => (
                            <NavLink key={items.name} href={items.path} className='px-4 text-base transition-all hover:text-on_link_active
                            text-on_text_gray_2 font-normal [&.active]:text-on_link_active
                            dark:text-on_dark_text_gray dark:hover:text-on_link_active'>
                                {items.name}
                            </NavLink>
                        ))
                    }
                </div>

                <div className='flex items-center justify-between gap-4 ml-auto lg:ml-0'>
                    <Search />
                    <ThemeModeToggle />
                    <Link href={"/login"}
                        className=' px-4 py-[10px] bg-gradient-to-r from-blue via-teal to-blue 
                                bg-200% rounded-md text-white text-center font-bold text-sm transition-all duration-500
                                hover:bg-right hidden sm:inline-block'>
                        Sign in
                    </Link>
                    <button className='flex items-center text-on_dark_text_gray lg:hidden' onClick={onRequestOpenNavMobile}>
                        <Bars3Icon className='w-9 h-9' />
                    </button>
                </div>

            </Wrapper>
        </nav>
    )
}

export default Navbar