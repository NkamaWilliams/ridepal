import TextInput from "@/components/form/text-input";
import Button from "@/components/general/button";
import styles from "@/styles/page.module.css";
import styles2 from "@/styles/signup.module.css"
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h1>Create a rider&apos;s account</h1>
        <br/>
        <p><b>Personal Information</b></p>
        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="First Name" type="text" name="firstname"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Last Name" type="text" name="lastname"/>
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
                <TextInput label="Company Name" type="text" name="company"/>
            </div>
        </div>

        <div className={styles2.group}>
            <div className={styles2.member}>
                <TextInput label="Work Email" type="email" name="workemail"/>
            </div>

            <div className={styles2.member}>
                <TextInput label="Work ID" type="text" name="id"/>
            </div>
        </div>

        <TextInput label="Work Address" type="text" name="address" />

        <Button text="Create Account"/>

        <br/>
      </form>
    </main>
  );
}
