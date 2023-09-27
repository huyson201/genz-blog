"use client"
import { Button } from '@/components/Button/Button'
import GradientText from '@/components/GradientText/GradientText'
import useCountdown from '@/hooks/useCoundown'
import authService from '@/services/auth.service'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { MdEmail } from 'react-icons/md'
import useSWRMutation from 'swr/mutation'

type Props = {}

const VerifyCard = (props: Props) => {
    const countdown = useCountdown(60)
    const { data: session, status } = useSession()
    const router = useRouter()
    const { trigger, isMutating } = useSWRMutation("/auth/send-request", (url: string, { arg }: { arg: { token: string } }) => {
        return authService.requestVerify(arg.token)
    })
    useEffect(() => {
        if (!session) return
        countdown.start()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleClickResend = () => {
        if (!session || countdown.time !== 0) return
        trigger({ token: session.backendTokens.access_token })
        countdown.restart()
    }
    return (
        <div className='flex items-center flex-col max-w-[500px] w-full '>
            <span className='text-2xl w-10 h-10 rounded-full flex items-center justify-center
                       shadow-[0_0_0_4px_rgba(187,247,208)]  bg-green-200 text-green-600'>
                <MdEmail />
            </span>
            <h1 className='text-center font-bold mt-6 text-2xl sm:text-3xl dark:text-gray-300  text-gray-700'>Check your email</h1>
            <p className='text-center mt-4 text-sm'>
                You&lsquo;re almost there! We sent an email to
            </p>
            <div className='text-center mt-1 dark:text-gray-300 text-gray-700 font-bold'>
                {session?.user.email}
            </div>
            <div className='text-sm text-center mt-4'>
                Just click on the link in that email to complete your verification. if you don&lsquo;t
                see it, you may need to
                <span className='font-bold dark:text-gray-300 text-gray-700' > check your spam</span> folder
            </div>
            <div className='mt-6 text-center'>
                still can&lsquo;t find email? No problem.
            </div>
            <div className='text-center mt-4'>
                <div className='text-black dark:text-white mb-1'>{countdown.time} s</div>
                <Button onClick={handleClickResend} size={"sm"}>
                    Resend Verify Email
                </Button>
            </div>
            <div className='text-black dark:text-white mt-4 text-sm'>Need help? <Link href={"/contact"}><GradientText>contact us</GradientText></Link></div>
        </div>
    )
}

export default VerifyCard