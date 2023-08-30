"use client";
import React, { useMemo, useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import SwitchDay from '@/assets/switch.mode-day.svg'
import SwitchNight from '@/assets/switch.mode-night.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Theme } from '../Provider/Provider';

type Props = {}

const switchIcons = {
    dark: SwitchNight,
    light: SwitchDay
}

const ThemeModeToggle = (props: Props) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const switchIcon = useMemo(() => switchIcons[(theme as Theme | undefined) || 'dark'], [theme])

    if (!mounted) return null

    return (
        <Switch
            checked={theme === 'light'}
            onChange={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
            className={`${theme === 'light' ? 'bg-on_dark_body_bg' : 'bg-[#7f92b0]'
                } relative inline-flex h-6 w-10 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${theme === 'light' ? 'translate-x-5' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-all`}
            >
                {
                    <Image src={switchIcon} alt='switch' />
                }
            </span>

        </Switch>
    )

}

export default ThemeModeToggle