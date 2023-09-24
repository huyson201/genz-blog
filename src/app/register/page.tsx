import { Metadata } from 'next'
import Register from '@/components/Page/Register'


type Props = {}
export const metadata: Metadata = {
    title: 'Sign Up - Create Your Account - Gen Z Blogger',
    description: "Register and create your account today. Join our community and get started on your journey. Sign up now for access to exclusive features.",
    alternates: {
        canonical: process.env.WEB_HOST_NAME + "register"
    },
    openGraph: {
        title: 'Sign Up - Create Your Account - Gen Z Blogger',
        description: "Register and create your account today. Join our community and get started on your journey. Sign up now for access to exclusive features.",
        images: [`/api/screenshot?url=${process.env.WEB_HOST_NAME}/register`]
    },
}

const RegisterPage = (props: Props) => {
    return (
        <Register />
    )
}

export default RegisterPage