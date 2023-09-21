
export const UnOrderList = ({ children }: { children: any }) => {
    return <ul className="list-disc pl-3" > {children} </ul>
}

export const OrderList = ({ children }: { children: any }) => {
    return <ol className="list-decimal pl-3" >{children}</ol>
}