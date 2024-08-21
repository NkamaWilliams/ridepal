'use client'
import TextInput from "@/components/form/text-input";
import Button from "@/components/general/button";
import Loading from "@/components/general/loading";
import { useAppContext } from "@/components/general/appcontext";
import Link from "next/link";
import Alert from "@/components/general/alert";
import { useRouter } from "next/navigation";
import endpoint from "@/resources/api-endpoint.json"
import styles from "@/styles/page.module.css";
import { FormEvent, use } from "react";
import { useState } from "react";

export default function Home() {
  const context = useAppContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [hideAlert, setAlert] = useState<boolean>(true)
  const [message, setMessage] = useState<string>("")
  const [type, setType] = useState<1|2>(2)
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
      if (response.ok){
        const result = await response.json()
        if (result.code == 401){
          setMessage("Wrong password provided!")
        }
        const data = result.data
        context.setContext(data.user.id, data.user.email, data.user.firstName, data.accessToken)
        console.log("Context Set!")
        sessionStorage.setItem("id", data.user.id);
        sessionStorage.setItem("username", data.user.username);
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("type", data.user.type??"rider");
        if (data.user.type == "driver"){
          sessionStorage.setItem("v-id", data.vechile.id)
        }
      }
      if (!response.ok){
        console.log("I'm not OK!")
        const text = JSON.parse(await response.text())
        setMessage(text.message)
      }
    } catch(err){
      console.log(err)
      sessionStorage.setItem("id", "");
      sessionStorage.setItem("username", "");
      sessionStorage.setItem("token", "");
    } finally{
      setLoading(false)
      if (sessionStorage.getItem("id") && sessionStorage.getItem("id") != ""){
        if (sessionStorage.getItem("type") == "driver"){
          route.push("/dashboard/driver")
        }
        else{
          route.push("/dashboard/rider")
        }
      }
      else{
        setAlert(false)
        setTimeout(() => {setAlert(true)}, 3000)
      }
    }
  }

  return (
    <main className={styles.main}>
      {loading && <Loading />}
      <Alert type={type} message={message} hide={hideAlert}/>
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
