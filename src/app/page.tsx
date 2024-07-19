import TextInput from "@/components/form/text-input";
import Button from "@/components/general/button";
import Link from "next/link";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
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
