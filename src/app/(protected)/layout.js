"use client"
import { redirect } from "next/navigation"
import { useSelector } from "react-redux"
function ProtectedLayout({ children }) {
    const token = useSelector(state => state.auth.token)
    return (
        !!token ? children : redirect("/login")
    )
}

export default ProtectedLayout