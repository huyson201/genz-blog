"use client";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import authService from '@/services/auth.service';
import { signOut, useSession } from 'next-auth/react'
import { Auth, BackendToken, Role } from '@/types/type';
import { useRouter } from 'next/navigation';
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { AiTwotoneSetting } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'
import Link from 'next/link';
interface Props {
    auth: Auth,
    tokens: BackendToken
}

export default function UserMenu({ auth, tokens }: Props) {
    const router = useRouter()
    const { data: session } = useSession()
    const handleLogout = async () => {
        const logoutResponse = await authService.logout(tokens.access_token)
        if (logoutResponse.ok) {
            signOut({ redirect: false }).then(_ => { router.push(`/auth/login`) })
        }
    }
    return (
        <Menu as="div" className="relative sm:inline-block text-left hidden ">
            <Menu.Button className="flex items-center justify-center">
                <Image className='w-7 h-7 rounded-full' src={auth.avatar_url} alt='avatar' height={50} width={50} />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  border  border-on_light_border_2 bg-on_light_card_bg dark:bg-on_dark_card_bg dark:border-on_dark_border">
                    <div className="py-1 divide-y dark:divide-on_dark_border divide-on_light_border_2">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/me"
                                    className={twMerge(
                                        active ? 'text-blue' : 'dark:text-on_dark_text_gray text-on_light_text_gray',
                                        ' px-4 py-2 text-sm flex items-center gap-2'
                                    )}
                                >
                                    <AiTwotoneSetting className='text-[18px]' />
                                    Account settings
                                </Link>
                            )}
                        </Menu.Item>
                        {
                            session && session.user.role == Role.Admin && (
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href="/me/posts/drafts"
                                            className={twMerge(
                                                active ? 'text-blue' : 'dark:text-on_dark_text_gray text-on_light_text_gray',
                                                ' px-4 py-2 text-sm flex items-center gap-2'
                                            )}
                                        >
                                            <BsPencilSquare className='text-[18px]' />
                                            Posts management
                                        </Link>
                                    )}
                                </Menu.Item>
                            )
                        }

                        <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="button"
                                        className={twMerge(
                                            active ? 'text-blue' : 'dark:text-on_dark_text_gray text-on_light_text_gray',
                                            ' gap-2 px-4 py-2 text-sm flex items-center '
                                        )}
                                        onClick={handleLogout}
                                    >
                                        <RiLogoutCircleRLine className='text-[18px]' />
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
