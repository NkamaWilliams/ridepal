'use client'
import { useAppContext } from "@/components/general/appcontext";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children}: Readonly<{children:ReactNode}>){
    const route = useRouter()
    const context = useAppContext()
    useEffect(
        () => {
            if (context.accessToken == ""){
                route.replace("/")
            }
        }, []
    )
    return<>
        {children}
    </>
}