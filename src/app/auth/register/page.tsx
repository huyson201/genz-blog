import { Metadata } from 'next'
import Register from '@/components/Page/Register'


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
        images: [`https://i.ibb.co/5kZDLHF/2tzw7q052pg69kkxwfuxsy39.png`],
        url: "/auth/register"
    },
}

const RegisterPage = (props: Props) => {
    return (
        <Register />
    )
}

export default RegisterPage