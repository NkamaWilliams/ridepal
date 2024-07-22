'use client'
import TextInput from "@/components/form/text-input";
import Button from "@/components/general/button";
import Link from "next/link";
import endpoint from "@/resources/api-endpoint.json"
import styles from "@/styles/page.module.css";
import { FormEvent } from "react";

export default function Home() {
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const entries = Object.fromEntries(new FormData(e.currentTarget).entries())
    const raw = {
      "email": entries["email"].toString(),
      "password": entries["password"].toString(),
    }
    console.log("RAW:")
    console.log(raw)
    try{
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(raw),
      }

      const response = await fetch(`${endpoint[0]}auth/signin`, requestOptions)
      console.log(await response.text())
      alert("SUCCESS!")
    } catch(err){
      console.log(err)
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
