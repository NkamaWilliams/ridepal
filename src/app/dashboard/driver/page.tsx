'use client'
import styles from "@/styles/driver.module.css"
import { useAppContext } from "@/components/general/appcontext"
import TextSelect from "@/components/form/text-select"
import Button from "@/components/general/button"
import DateTime from "@/components/form/date-time"

export default function Driver(){
    const context = useAppContext()
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return(
        <main className={styles.main}>
            <h1>Welcome back, {context.username}</h1>

            <form onSubmit={handleSubmit}>
                <h3>Publish a route</h3>
                <TextSelect name="pickup" label="Pickup Location" type="search" />
                <TextSelect name="drop" label="Drop Location" type="search" />
                <DateTime />
                <Button text="Publish" />
            </form>
        </main>
    )
}