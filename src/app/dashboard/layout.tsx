'use client'
import { useAppContext } from "@/components/general/appcontext";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children}: Readonly<{children:ReactNode}>){
    const [allowed, setAllowed] = useState<boolean>(true)
    const route = useRouter()
    const context = useAppContext()
    const details = ["id", "email", "username", "token"]
    useEffect(
        () => {
            if(context.accessToken != ""){
                return
            }
            else if (sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == null){
                setAllowed(false)
                route.replace("/")
            }
        }, []
    )
    return<>
        {allowed && children}
    </>
}