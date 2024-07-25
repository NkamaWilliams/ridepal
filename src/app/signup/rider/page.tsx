'use client'
import TextInput from "@/components/form/text-input";
import FileInput from "@/components/form/file-input";
import endpoint from "@/resources/api-endpoint.json"
import Button from "@/components/general/button";
import Loading from "@/components/general/loading";
import Alert from "@/components/general/alert";
import styles from "@/styles/page.module.css";
import styles2 from "@/styles/signup.module.css"
import { useState } from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const route = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [hidealert, setAlert] = useState<boolean>(true)

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try{
            const data = new FormData(e.currentTarget);
            const requestOptions = {
                method: 'POST',
                body: data,
            };
            let response = await fetch(`${endpoint[0]}driver/signup/`, requestOptions);
            console.log(response.status)
            console.log(await response.text())
            if (response.status == 400){
                console.log("Bad request!");
            }
            if (response.status == 201){
                setAlert(false)
            }
        } catch(err){
            console.log(err)
        } finally{
            setLoading(false)
            setTimeout(() => {setAlert(true)}, 3500)
            // route.push("/")
        }
    }

  return (
    <main className={styles.main}>
      {loading && <Loading />}
      <Alert type={1} message="Please wait for verification mail before attempting to login!" hide={hidealert}/>
      <form onSubmit={handleSubmit} className={styles.form} method="post">
        <h1>Create a driver&apos;s account</h1>
        <br/>
        <p><b>Personal Information</b></p>
        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="First Name" type="text" name="firstName"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Last Name" type="text" name="lastName"/>
            </div>
        </div>

        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="Email" type="email" name="email"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Password" type="password" name="password"/>
            </div>
        </div>

        <p><b>Professional Information</b></p>

        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="Profession" type="text" name="profession"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Company Name" type="text" name="companyName"/>
            </div>
        </div>

        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="Work Email" type="email" name="workEmail"/>
            </div>

            <div className={styles2.member}>
                <FileInput label="Work ID" name="workID"/>
            </div>
        </div>

        <TextInput label="Work Address" type="text" name="workAddress" />

        <Button text="Create Account"/>
        <br/>
      </form>
    </main>
  );
}