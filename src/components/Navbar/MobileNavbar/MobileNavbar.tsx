
"use client";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiX } from 'react-icons/hi'
import Logo from '../../Logo/Logo';
import Link from 'next/link';
import NavLink from '../../Common/NavLink/NavLink';
import { navMenu } from '../Navbar';

interface Props {
    open?: boolean
    onRequestClose: () => void
}

const MobileNavbar = ({ open, onRequestClose }: Props) => {


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[6] lg:hidden" onClose={onRequestClose}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 z-[5] bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 z-[6] flex justify-end">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="invisible opacity-0"
                        enterTo="visible opacity-100"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="visible opacity-100"
                        leaveTo="invisible opacity-0"
                    >
                        <Dialog.Panel className="relative px-6 py-5 bg-on_light_body_bg dark:bg-on_dark_body_bg flex w-full max-w-xs flex-col overflow-y-auto  pb-12 shadow-xl">
                            <div className="flex  justify-between items-center pb-4 border-b border-b-[#d5dfe4] dark:border-b-on_dark_border">
                                <Logo />
                                <button
                                    type="button"
                                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                    onClick={onRequestClose}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <HiX className="text-3xl text-on_dark_text_gray" />
                                </button>
                            </div>
                            <div className='py-4 space-y-6 border-b border-b-[#d5dfe4] dark:border-b-on_dark_border'>

                                {
                                    navMenu.map(items => (
                                        <NavLink
                                            key={items.path} href={items.path}
                                            className='block text-on_text_gray_2 hover:text-[#708ab0] dark:text-[#e6f0ff] dark:hover:text-on_dark_text_gray transition-all
                                                        [&.active]:text-blue font-medium hover:px-1'>
                                            {items.name}
                                        </NavLink>
                                    ))
                                }

                            </div>
                            <div className='py-6 border-b border-b-[#d5dfe4] dark:border-b-on_dark_border '>
                                <Link href={"/login"} className='inline-block bg-primary-gradient bg-200% hover:bg-right transition-all text-white px-4 py-1 font-bold rounded-md' >
                                    Sign in
                                </Link>
                            </div>
                            <div className='text-xs mt-6 text-on_text_gray_2 dark:text-[#e6f0ff]'>
                                Copyright 2023 &copy; Genz - Personal Blog Template.
                                <br />
                                Designed by
                                <Link href={"http://alithemes.com/"} className='text-blue' target='_blank'> AliThemes</Link>.
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>)
}

export default MobileNavbar