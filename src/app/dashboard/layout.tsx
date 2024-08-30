'use client'
import { useAppContext } from "@/components/general/appcontext";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  const route = useRouter();
  const context = useAppContext();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (context.accessToken === "" && (!storedToken || storedToken === "")) {
      route.replace("/");
    }
  }, [context.accessToken, route]);

  return <>{children}</>;
}
