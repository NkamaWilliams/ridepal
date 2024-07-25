'use client'
import styles from "@/styles/driver.module.css"
import { useAppContext } from "@/components/general/appcontext"
import TextSelect from "@/components/form/text-select"
import Checkbox from "@/components/form/checkbox"
import Button from "@/components/general/button"
import DateTime from "@/components/form/date-time"
import { useState } from "react"

interface stopProps{
    func: () => void
}

export default function Driver(){
    const context = useAppContext()
    const [stops, setStops] = useState<boolean>(false)
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const closeStops = () => {
        setStops(false)
    }
    const openStops = () => {
        setStops(true)
    }
    return(
        <main className={styles.main}>
            <h1>Welcome back, {context.username}</h1>

            <form onSubmit={handleSubmit} method="post">
                <h3>Publish a route</h3>
                <TextSelect name="pickup" label="Pickup Location" type="search" />
                <TextSelect name="drop" label="Drop Location" type="search" />
                <DateTime />
                {stops && <Stops func={closeStops}/>}
                <Button functionality={openStops} text="Choose Stops" type="button" design={2}/>
                <Button text="Publish" />
            </form>

        </main>
    )
}

function Stops({func}: stopProps){
    return(
        <div className={styles.busStops}>
            <div className={styles.choices}>
                <h3>Select all stops!</h3>

                <Checkbox name="stop" label="Num 2, Ademuyiwa Street, Ikeja"/>
                <Button functionality={func} type="button" text="Done" design={2}/>
            </div>
        </div>
    )
}