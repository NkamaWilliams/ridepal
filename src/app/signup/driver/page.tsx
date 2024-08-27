'use client'
import TextInput from "@/components/form/text-input";
import FileInput from "@/components/form/file-input";
import Button from "@/components/general/button";
import Loading from "@/components/general/loading";
import Alert from "@/components/general/alert";
import endpoint from "@/resources/api-endpoint.json"
import styles from "@/styles/page.module.css";
import styles2 from "@/styles/signup.module.css"
import { useState } from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

interface alert{
    type: 1|2,
    message: string,
}

const PHONE_NUMBER_PATTERN = /^0[0-9]{10}$/;

export default function Home() {
    const route = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [hidealert, setHideAlert] = useState<boolean>(true)
    const [alert, setAlert] = useState<alert>({type: 1, message: "Please wait for verification mail before attempting to login!"})

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        let isOk = false;
        e.preventDefault();
        setLoading(true)
        try{
            let data = new FormData(e.currentTarget);
            let password = data.get("password")
            let confirmPassword = data.get("cpassword")
            let phoneNumber = data.get("phoneNumber") as string
            
            if(!PHONE_NUMBER_PATTERN.test(phoneNumber)){
                setAlert({type:2, message: "Invalid Phone Number! Must match format 0xxxxxxxxxx e.g. 07012934999"})
                setHideAlert(false)
                setTimeout(() => {setHideAlert(true)}, 4500)
                return
            }

            if (password != confirmPassword){
                setAlert({type:2, message: "Ensure password and confirm password are the same!"})
                setHideAlert(false)
                setTimeout(() => {setHideAlert(true)}, 3500)
                return
            }

            data.delete("cpassword")
            const requestOptions = {
                method: 'POST',
                body: data,
            };
            let response = await fetch(`${endpoint[0]}driver/signup/`, requestOptions);
            console.log(response.status)
            if (response.ok){
                setAlert({type: 1, message: "Please wait for verification mail before attempting to login!"});
                isOk = true;
                const result = await response.json()
                if (result.code == 400){
                    setAlert(prev => ({...prev, message:"Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character!"}))
                }
            }
            else{
                const text = JSON.parse(await response.text())
                setAlert({type: 2, message: text.message});
            }
            setLoading(false)
            setTimeout(() => {setHideAlert(true)}, 3500);
            if (isOk){
                setTimeout(() => {route.push("/")}, 4500)
            }
        } catch(err){
            console.log(err)
        } finally{
            setLoading(false)
            setHideAlert(false)
        }
    }

  return (
    <main className={styles.main}>
      {loading && <Loading />}
      <Alert type={alert.type} message={alert.message} hide={hidealert}/>
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
                <TextInput label="Phone Number" type="text" name="phoneNumber"/>
            </div>
        </div>

        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="Password" type="password" name="password"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Confirm Password" type="password" name="cpassword"/>
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

        <p><b>Car Details</b></p>
        
        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="Model" type="text" name="model"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Color" type="text" name="color"/>
            </div>
        </div>

        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="Plate Number" type="text" name="plateNumber"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Number of Seats" type="text" name="seatNumber"/>
            </div>
        </div>

        <Button text="Create Account"/>

        <br/>
      </form>
    </main>
  );
}
