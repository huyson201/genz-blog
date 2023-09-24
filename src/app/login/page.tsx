
import { Metadata } from 'next'
import Login from '@/components/Page/Login'

type Props = {}

export const metadata: Metadata = {
    title: 'Login - Secure Access to Your Account - Gen Z Blogger',
    description: "Login to access your account securely. Enter your credentials to get started. Protect your data with our secure login process."
    ,
    alternates: {
        canonical: "/login"
    },
    openGraph: {
        title: 'Login - Secure Access to Your Account - Gen Z Blogger',
        description: "Login to access your account securely. Enter your credentials to get started. Protect your data with our secure login process.",
        images: [`/api/screenshot?url=${process.env.VERCEL_URL || `http://localhost:${process.env.PORT || 3000}`}/login`]
    },
}


const LoginPage = (props: Props) => {
    return <Login />
}

export default LoginPage