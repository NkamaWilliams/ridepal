'use client';
import TextInput from "@/components/form/text-input";
import FileInput from "@/components/form/file-input";
import endpoint from "@/resources/api-endpoint.json";
import Button from "@/components/general/button";
import Loading from "@/components/general/loading";
import Alert from "@/components/general/alert";
import styles from "@/styles/page.module.css";
import styles2 from "@/styles/signup.module.css";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface AlertProps {
  type: 1 | 2;
  message: string;
}

const PHONE_NUMBER_PATTERN = /^0[0-9]{10}$/;

export default function Home() {
  const router = useRouter();
  const [alert, setAlert] = useState<AlertProps>({
    type: 1,
    message: "Please wait for a verification email before attempting to log in!",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [hideAlert, setHideAlert] = useState<boolean>(true);

  const displayAlert = (type: 1 | 2, message: string, duration: number = 3500) => {
    setAlert({ type, message });
    setHideAlert(false);
    setTimeout(() => setHideAlert(true), duration);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let isOk = false;

    try {
      const data = new FormData(e.currentTarget);
      const password = data.get("password") as string;
      const confirmPassword = data.get("cpassword") as string;
      const phoneNumber = data.get("phoneNumber") as string;

      if (!PHONE_NUMBER_PATTERN.test(phoneNumber)) {
        displayAlert(2, "Invalid Phone Number! Must match format 0xxxxxxxxxx e.g. 07012934999", 4500);
        return;
      }

      if (password !== confirmPassword) {
        displayAlert(2, "Ensure password and confirm password are the same!", 3500);
        return;
      }

      data.delete("cpassword");

      const requestOptions = {
        method: 'POST',
        body: data,
      };

      const response = await fetch(`${endpoint[0]}passenger/signup/`, requestOptions);

      if (!response.ok) {
        const text = JSON.parse(await response.text());
        displayAlert(2, text.message);
      } else if (response.status === 201) {
        displayAlert(1, "Please wait for verification mail before attempting to login!");
        isOk = true;
      }

      if (isOk) {
        setTimeout(() => router.push("/"), 4500);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      displayAlert(2, "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {loading && <Loading />}
      <Alert type={alert.type} message={alert.message} hide={hideAlert} />
      <form onSubmit={handleSubmit} className={styles.form} method="post">
        <h1>Create a rider&apos;s account</h1>
        <br />
        <p><b>Personal Information</b></p>
        <div className={styles2.group}>
          <div className={styles2.member}>
            <TextInput label="First Name" type="text" name="firstName" />
          </div>

          <div className={styles2.member}>
            <TextInput label="Last Name" type="text" name="lastName" />
          </div>
        </div>

        <div className={styles2.group}>
          <div className={styles2.member}>
            <TextInput label="Email" type="email" name="email" />
          </div>

          <div className={styles2.member}>
            <TextInput label="Phone Number" type="text" name="phoneNumber" />
          </div>
        </div>

        <div className={styles2.group}>
          <div className={styles2.member}>
            <TextInput label="Password" type="password" name="password" />
          </div>

          <div className={styles2.member}>
            <TextInput label="Confirm Password" type="password" name="cpassword" />
          </div>
        </div>

        <p><b>Professional Information</b></p>

        <div className={styles2.group}>
          <div className={styles2.member}>
            <TextInput label="Profession" type="text" name="profession" />
          </div>

          <div className={styles2.member}>
            <TextInput label="Company Name" type="text" name="companyName" />
          </div>
        </div>

        <div className={styles2.group}>
          <div className={styles2.member}>
            <TextInput label="Work Email" type="email" name="workEmail" />
          </div>

          <div className={styles2.member}>
            <FileInput label="Work ID" name="workID" />
          </div>
        </div>

        <TextInput label="Work Address" type="text" name="workAddress" />
        <Button text="Create Account" />
        <br />
      </form>
    </main>
  );
}
