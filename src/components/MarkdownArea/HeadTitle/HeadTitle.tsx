
export const Head1 = ({ children }: { children: any }) => {


    return (
        <h2 className=' md:text-4xl xs:text-3xl text-2xl font-bold text-on_light_text_white dark:text-on_dark_text_white'>
            {children}
        </h2>
    )
}
export const Head2 = ({ children }: { children: any }) => {


    return (
        <h2 className=' md:text-4xl xs:text-3xl text-2xl font-bold text-on_light_text_white dark:text-on_dark_text_white'>
            {children}
        </h2>
    )
}
export const Head3 = ({ children }: { children: any }) => {


    return (
        <h3 className=' text-2xl font-bold text-on_light_text_white dark:text-on_dark_text_white'>
            {children}
        </h3>
    )
}
export const Head4 = ({ children }: { children: any }) => {


    return (
        <h4 className=' text-[22px] leading-8 font-bold text-on_light_text_white dark:text-on_dark_text_white'>
            {children}
        </h4>
    )
}
export const Head5 = ({ children }: { children: any }) => {
    return (
        <h5 className=' text-xl font-bold text-on_light_text_white dark:text-on_dark_text_white'>
            {children}
        </h5>
    )
}
export const Head6 = ({ children }: { children: any }) => {

    return (
        <h6 className=' text-[18px] leading-7 font-bold text-on_light_text_white dark:text-on_dark_text_white'>
            {children}
        </h6>
    )
}

