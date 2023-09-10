
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    loading?: boolean
}

const GradientButton = ({ className, title, loading, ...props }: Props) => {

    return (
        <button
            {...props}
            className={` disabled:opacity-60 text-center flex items-center justify-center outline-none bg-primary-gradient bg-200%  transition-all duration-500
             hover:bg-right ${className}`}>
            {
                loading ? <ColorRing
                    height="30"
                    width="30"
                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> : title
            }
        </button>
    )
}

export default GradientButton