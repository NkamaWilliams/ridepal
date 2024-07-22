'use client'
import TextInput from "@/components/form/text-input";
import FileInput from "@/components/form/file-input";
import Button from "@/components/general/button";
import endpoint from "@/resources/api-endpoint.json"
import styles from "@/styles/page.module.css";
import styles2 from "@/styles/signup.module.css"
import Link from "next/link";
import { FormEvent } from "react";

export default function Home() {
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
        } catch(err){
            console.log(err)
        }
    }
  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
{/* 
        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="ID" type="text" name="id"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Owner ID" type="text" name="ownerid"/>
            </div>
        </div> */}

        <Button text="Create Account"/>

        <br/>
      </form>
    </main>
  );
}
