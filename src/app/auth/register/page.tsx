import { Metadata } from 'next'
import Register from '@/components/Page/Register'
import { createOpenGraphImg } from '@/utils'


type Props = {}
export const metadata: Metadata = {
    title: 'Sign Up - Create Your Account',
    description: "Register and create your account today. Join our community and get started on your journey. Sign up now for access to exclusive features.",
    alternates: {
        canonical: "/auth/register"
    },
    openGraph: {
        title: 'Sign Up - Create Your Account',
        description: "Register and create your account today. Join our community and get started on your journey. Sign up now for access to exclusive features.",
        images: [`/api/screenshot?url=${createOpenGraphImg()}/auth/register`],
        url: "/auth/register"
    },
}

const RegisterPage = (props: Props) => {
    return (
        <Register />
    )
}

export default RegisterPage