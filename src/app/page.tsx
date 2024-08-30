'use client'
import TextInput from "@/components/form/text-input";
import Button from "@/components/general/button";
import Loading from "@/components/general/loading";
import { useAppContext } from "@/components/general/appcontext";
import Link from "next/link";
import Alert from "@/components/general/alert";
import { useRouter } from "next/navigation";
import endpoint from "@/resources/api-endpoint.json";
import styles from "@/styles/page.module.css";
import { FormEvent, useState } from "react";

interface UserData {
  id: string;
  email: string;
  firstName?: string;
  username?: string;
  type?: string;
}

interface vehicle{
  id: string, 
  color: string, 
  model: string, 
  plateNumber: string, 
  seatNumber: number 
}
// vechile?: { id: string, color: string, model: string, plateNumber: string, seatNumber: number };

interface ApiResponse {
  code?: number;
  message: string;
  data: {
    user: UserData;
    accessToken: string;
    vechile: vehicle;
  };
}

export default function Home() {
  const context = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [hideAlert, setAlert] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<1 | 2>(2);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const raw = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    try {
      const response = await fetch(`${endpoint[0]}auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(raw),
      });

      if (response.ok) {
        const result: ApiResponse = await response.json();
        if (result.code == 400 || result.code == 401){
          setMessage(result.message)
        }
        const { user, accessToken, vechile } = result.data;
        const name = user.firstName ?? user.username ?? "User";
        
        context.setContext(user.id, user.email, name, accessToken);
        setSessionData(user, accessToken, vechile);
        
        router.push(user.type === "driver" ? "/dashboard/driver" : "/dashboard/rider");
      } else {
        const error = await response.json();
        setMessage(error.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      clearSessionData();
    } finally {
      setLoading(false);
      handleAlert();
    }
  };

  const setSessionData = (user: UserData, accessToken: string, vechile:vehicle) => {
    console.log("USer")
    console.log(user)
    sessionStorage.setItem("id", user.id);
    sessionStorage.setItem("username", user.firstName ?? user.username ?? "User");
    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("type", user.type ?? "rider");
    if (user.type === "driver" && vechile) {
      console.log("There is a vehicle")
      sessionStorage.setItem("v-id", vechile.id);
    }
  };

  const clearSessionData = () => {
    sessionStorage.clear();
  };

  const handleAlert = () => {
    if (!sessionStorage.getItem("id")) {
      setAlert(false);
      setTimeout(() => setAlert(true), 3000);
    }
  };

  return (
    <main className={styles.main}>
      {loading && <Loading />}
      <Alert type={type} message={message} hide={hideAlert} />
      <form onSubmit={handleSubmit} className={styles.form} method="post">
        <h1>Login</h1>
        <TextInput label="Email" type="email" name="email" />
        <TextInput label="Password" type="password" name="password" />
        <Button text="Login" />

        <br />
        <p>
          Don&apos;t have an account yet? Click{" "}
          <Link className={styles.link} href="/signup">
            here
          </Link>{" "}
          to sign up
        </p>
      </form>
    </main>
  );
}
