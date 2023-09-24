import { SaveOptions } from '@/types/type'
import React from 'react'
import ListPost from './ListPost'

type Props = {
    params: {
        type: string
    },
    searchParams: {
        page: number,
        q?: string
    }
}

const displayOption: Record<string, SaveOptions> = {
    "public": SaveOptions.PUBLIC,
    "drafts": SaveOptions.JUST_ME
}

const displayMetaData: Record<string, { title: string, desc: string }> = {
    "public": {
        title: "Manage Public Posts - Your Published Content - Gen Z Blogger",
        desc: "Effortlessly manage your public posts, published content, and share your work with the world on Gen Z Blogger. Edit, update, and maintain your online presence using our user-friendly post management dashboard."

    },
    "drafts": {
        title: "Manage Drafts - Your Unpublished Content - Gen Z Blogger",
        desc: "Efficiently manage your drafts, unpublished content, and work in progress on  Gen Z Blogger. Edit, organize, and prepare your content for publication using our user-friendly draft management dashboard."

    }
}

export async function generateMetadata({ params: { type } }: Props) {
    const data = displayMetaData[type]
    return {
        title: data.title || "Gen Z Blogger",
        description: data.desc || "",
        alternates: {
            canonical: `/me/posts/${type}`
        },
        openGraph: {
            title: data.title || "Gen Z Blogger",
            description: data.desc || ""
        },

    }
}

export async function generateStaticParams() {
    return [{ type: "public" }, { type: "drafts" }]
}
export const dynamicParams = false

const PostListPage = ({ params, searchParams: { page = 1, q } }: Props) => {
    const { type } = params
    return (
        <div>
            <ListPost type={displayOption[type]} page={page} q={q} />
        </div>
    )
}

export default PostListPage