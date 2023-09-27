
import { Metadata } from 'next'
import Login from '@/components/Page/Login'
import { createOpenGraphImg } from '@/utils'

type Props = {}

export const metadata: Metadata = {
    title: 'Login - Secure Access to Your Account',
    description: "Login to access your account securely. Enter your credentials to get started. Protect your data with our secure login process."
    ,
    alternates: {
        canonical: "/auth/login"
    },
    openGraph: {
        title: 'Login - Secure Access to Your Account',
        description: "Login to access your account securely. Enter your credentials to get started. Protect your data with our secure login process.",
        images: [`/api/screenshot?url=${createOpenGraphImg()}/login`],
        url: '/auth/login'
    },
}


const LoginPage = (props: Props) => {
    return <Login />
}

export default LoginPage