
import { Metadata } from 'next'
import Login from '@/components/Page/Login'

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
        images: [`https://i.ibb.co/q5fpxwp/u5hh4509vkj1kru97ruhz05f.png`],
        url: '/auth/login'
    },
}

const LoginPage = (props: Props) => {
    return <Login />
}

export default LoginPage