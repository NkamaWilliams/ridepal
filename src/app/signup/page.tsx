import Link from "next/link"
import Logo from "@/components/general/logo"
import Button from "@/components/general/button"
import mainStyle from "@/styles/page.module.css"
import styles from "@/styles/signup.module.css"

export default function SignUp(){
    return(
        <main className={mainStyle.main}>
            <h1 className={styles.tagline}>Create an account with <Logo inheritFont/></h1>

            <div className={styles.choice}>
                <div>
                    <Link href="/signup/driver">
                        <Button text="Driver's Account"/>
                    </Link>

                    <p>This allows you to use your car to earn more money</p>
                </div>

                <div>
                    <Link href="/signup/rider">
                        <Button text="Rider's Account"/>
                    </Link>
                    <p>This allows you to choose your ride to a destination</p>
                </div>
            </div>
        </main>
    )
}