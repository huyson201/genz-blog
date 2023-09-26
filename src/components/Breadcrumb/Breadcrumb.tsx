"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { BiHomeAlt2 } from 'react-icons/bi'
import { FaAngleRight } from 'react-icons/fa6'
type Props = {
    replaceLastText?: string,
    hiddenRoute?: string[]
}

const Breadcrumb = ({ replaceLastText, hiddenRoute = [] }: Props) => {
    const pathname = usePathname()

    const breadcrumbs = useMemo(() => {
        // Remove any query parameters, as those aren't included in breadcrumbs
        const asPathWithoutQuery = pathname.split("?")[0];

        // Break down the path between "/"s, removing empty entities
        // Ex:"/my/nested/path" --> ["my", "nested", "path"]
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
            .filter(v => v.length > 0);

        const asPathWithoutHiddenRoutes = asPathNestedRoutes.filter(path => !hiddenRoute.includes(path))
        // Iterate over the list of nested route parts and build
        // a "crumb" object for each one.
        const crumblist = asPathWithoutHiddenRoutes.map((subpath, idx) => {
            // We can get the partial nested route for the crumb
            // by joining together the path parts up to this point.
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            // The title will just be the route string for now
            const text = subpath[0].toUpperCase() + subpath.substring(1);
            return { href, text };
        })

        // Add in a default "Home" crumb for the top-level
        return [{ href: "/", text: "Home" }, ...crumblist];
    }, [pathname, hiddenRoute])

    return (
        <div className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-x-1 md:gap-x-3 flex-wrap gap-y-1">
                {
                    breadcrumbs.map((value, index) => (
                        <Crumb href={value.href} text={breadcrumbs.length - 1 === index && replaceLastText ? replaceLastText : value.text} icon={value.href === '/' && <CrumbHomeIcon />} key={value.href + index} last={breadcrumbs.length - 1 === index} />
                    ))
                }
            </ol>
        </div>
    )
}

export default Breadcrumb

interface CrumbProps {
    href: string,
    text: string,
    last?: boolean,
    icon?: React.ReactNode
}

export const Crumb = ({ href, text, last, icon }: CrumbProps) => {
    if (last) {
        return (
            <li className="inline-block">
                <span className="text-sm text-left text-on_dark_text_gray">{text}</span>
            </li>
        )
    }

    return (
        <li className="inline-flex items-center">
            <Link href={href} className="breadcrumb-links mr-1 md:mr-2">
                {icon}
                {text}
            </Link>
            <FaAngleRight className="text-on_dark_text_gray mt-0.5" />
        </li>
    )
}

const CrumbHomeIcon = () => (
    <span className=' w-6 h-6 text-white mr-2 rounded-full bg-primary-gradient bg-200% inline-flex items-center justify-center'>
        <BiHomeAlt2 />
    </span>
)