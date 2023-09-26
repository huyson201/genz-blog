"use server"
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from 'react'
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode
}
const PrivateRoute = ({ children }: Props) => {
    const session = getServerSession(options)
    if (!session) return redirect("/auth/login")
    return children;
}

export default PrivateRoute;