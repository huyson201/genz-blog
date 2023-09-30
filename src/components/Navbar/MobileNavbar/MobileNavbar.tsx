
"use client";
import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiX } from 'react-icons/hi'
import Logo from '../../Logo/Logo';
import Link from 'next/link';
import NavLink from '../../Common/NavLink/NavLink';
import { navMenu } from '../Navbar';
import { buttonVariants } from '@/components/Button/Button';
import { cn } from '@/utils';
import { signOut, useSession } from 'next-auth/react';
import { RotatingLines } from 'react-loader-spinner';
import Image from 'next/image';
import { Role } from '@/types/type';
import useCallbackUrl from '@/hooks/useCallbackUrl';
import { useMobileNav } from '@/contexts/MobileNavContext';
import { usePathname } from 'next/navigation';

interface Props {
}

const MobileNavbar = ({ }: Props) => {
    const { data: session, status } = useSession()
    const callbackUrl = useCallbackUrl()
    const mobileNav = useMobileNav()
    const pathname = usePathname()
    const isAdminRole = session?.user.role === Role.Admin;

    useEffect(() => {
        if (!mobileNav?.isOpen) return
        mobileNav?.close()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <Transition.Root show={mobileNav?.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[6] lg:hidden" onClose={() => mobileNav?.close()}>
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
                                    onClick={() => mobileNav?.close()}
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
                                            exact={items.path === '/'}
                                            key={items.path} href={items.path}
                                            className='block text-on_text_gray_2 hover:text-[#708ab0] dark:text-[#e6f0ff] dark:hover:text-on_dark_text_gray transition-all
                                                        [&.active]:text-blue font-medium hover:px-1'>
                                            {items.name}
                                        </NavLink>
                                    ))
                                }

                            </div>
                            <div className='py-6 border-b border-b-[#d5dfe4] dark:border-b-on_dark_border '>

                                {
                                    status === "loading" && <div className='flex items-center justify-center gap-2'>
                                        <RotatingLines
                                            strokeColor="grey"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="32"
                                            visible={true}
                                        />
                                        <span className='text-sm dark:text-on_dark_text_gray text-on_light_text_gray'>Loading...</span>
                                    </div>
                                }
                                {
                                    status === "unauthenticated" && (<Link href={{ pathname: "/auth/login", query: { callbackUrl } }}
                                        className={cn(buttonVariants({ className: "inline-block", size: "md" }))} >
                                        Sign in
                                    </Link>)
                                }

                                {
                                    status === "authenticated" && (
                                        <div>
                                            <div className='flex items-center gap-2'>
                                                <Image className='rounded-full w-10 h-10' src={session?.user.avatar_url || ""} alt='avatar' height={40} width={40} />
                                                <div className='space-y-0.5'>
                                                    <div className='text-sm font-semibold text-on_light_text_white dark:text-on_dark_text_white'>
                                                        Hello, {session?.user.name}
                                                    </div>
                                                    <div className='text-xs text-[#6c757d]'>{session?.user.email}</div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 mt-4'>
                                                <Link
                                                    href={"/me"}
                                                    className='text-sm block text-on_text_gray_2 hover:text-[#708ab0] dark:text-[#e6f0ff] dark:hover:text-on_dark_text_gray transition-all
                                                    [&.active]:text-blue font-medium hover:px-1'>
                                                    Account Setting
                                                </Link>

                                                {
                                                    isAdminRole && (
                                                        <>

                                                            <Link
                                                                href={"/me/posts/drafts"}
                                                                className='text-sm block text-on_text_gray_2 hover:text-[#708ab0] dark:text-[#e6f0ff] dark:hover:text-on_dark_text_gray transition-all
                                                    [&.active]:text-blue font-medium hover:px-1'>
                                                                Post Manager
                                                            </Link>
                                                            <Link
                                                                href={"/publish/post"}
                                                                className='text-sm block text-on_text_gray_2 hover:text-[#708ab0] dark:text-[#e6f0ff] dark:hover:text-on_dark_text_gray transition-all
                                                    [&.active]:text-blue font-medium hover:px-1'>
                                                                Add New Post
                                                            </Link>
                                                        </>
                                                    )
                                                }
                                                <button
                                                    onClick={() => signOut()}
                                                    className='text-sm block text-on_text_gray_2 hover:text-[#708ab0] dark:text-[#e6f0ff] dark:hover:text-on_dark_text_gray transition-all
                                                    [&.active]:text-blue font-medium hover:px-1 text-left'>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }


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