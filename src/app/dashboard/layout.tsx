'use client'
import { useAppContext } from "@/components/general/appcontext";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children}: Readonly<{children:ReactNode}>){
    const route = useRouter()
    const context = useAppContext()
    useEffect(
        () => {
            if(context.accessToken != ""){
                return
            }
            else if (sessionStorage.getItem("token") == "" || sessionStorage.getItem("token") == null){
                route.replace("/")
            }
        }, [context, route]
    )
    return<>
        {(sessionStorage.getItem("id") && sessionStorage.getItem("id") != "") && children}
    </>
}