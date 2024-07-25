'use client'
import TextInput from "@/components/form/text-input";
import Button from "@/components/general/button";
import Loading from "@/components/general/loading";
import { useAppContext } from "@/components/general/appcontext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import endpoint from "@/resources/api-endpoint.json"
import styles from "@/styles/page.module.css";
import { FormEvent } from "react";
import { useState } from "react";

export default function Home() {
  const context = useAppContext()
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRouter()

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const entries = Object.fromEntries(new FormData(e.currentTarget).entries())
    const raw = {
      "email": entries["email"].toString(),
      "password": entries["password"].toString(),
    }
    try{
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(raw),
      }

      const response = await fetch(`${endpoint[0]}auth/signin`, requestOptions)

      if (response.status == 200){
        const result = await response.json()
        const data = result.data
        context.setContext(data.user.id, data.user.email, data.user.username, data.accessToken)
        console.log("Context Set!")
        sessionStorage.setItem("id", data.user.id);
        sessionStorage.setItem("username", data.user.username);
        sessionStorage.setItem("token", data.accessToken);
      }
    } catch(err){
      console.log(err)
    } finally{
      setLoading(false)
      route.push("/dashboard/driver")
    }
  }

  return (
    <main className={styles.main}>
      {loading && <Loading />}
      {/* <Alert type={2} message="Failure is you, and so is me!"/> */}
      <form onSubmit={handleSubmit} className={styles.form} method="post">
        <h1>Login</h1>
        <TextInput label="Email" type="email" name="email"/>
        <TextInput label="Password" type="password" name="password"/>
        <Button text="Login"/>

        <br/>
        <p>Don&apos;t have an account yet? Click <Link className={styles.link} href="/signup">here</Link> to sign up</p>
      </form>
    </main>
  );
}
