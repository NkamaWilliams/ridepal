'use client'
import styles from "@/styles/dashboard.module.css"
import Rate from "@/components/general/rate"
import Button from "@/components/general/button"
import { FormEvent, useState } from "react"

export default function Route(){
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const closeRate = () => {
        setViewRate(false)
    }
    const [viewRate, setViewRate] = useState<boolean>(true)
    return(
        <main className={styles.main}>
            {/* {viewRate && <Rate handleClick={closeRate}/>} */}
            <h1>Active Routes</h1>

            <div className={styles.route}>
                <div>
                    <p><b>Destination</b></p>
                    <p> Random address of a place 1</p>
                </div>

                <div className={styles.stops}>
                    <p><b>Stops</b></p>
                    <p> Random address of a place 1 <button className={styles.removebtn}>Remove</button></p>
                    <p> Random address of a place 1 <button className={styles.removebtn}>Remove</button></p>
                    <p> Random address of a place 1 <button className={styles.removebtn}>Remove</button></p>
                </div>

                <div>
                    <p><b>Departure Time</b></p>
                    <p>9:00 AM</p>
                </div>

                <div>
                    <p><b>Total Expected Duration</b></p>
                    <p>25 mins</p>
                </div>

                <div>
                    <Button text="Cancel Route" design={2}/>
                    <Button text="Route Completed"/>
                </div>
            </div>

            <div className={`${styles.route} ${styles.passenger}`}>
                <div className={styles.stops}>
                    <p><b>Applied Passengers</b></p>
                    <p> Janet Doyle <button className={styles.removebtn}>Accept</button></p>
                    <p> Janet Doyle <button className={styles.removebtn}>Accept</button></p>
                    <p> Janet Doyle <button className={styles.removebtn}>Accept</button></p>
                </div>

                <div className={styles.stops}>
                    <p><b>Accepted Passengers</b></p>
                    <p> John Doe <button className={styles.removebtn}>Remove</button></p>
                    <p> John Doe <button className={styles.removebtn}>Remove</button></p>
                    <p> John Doe <button className={styles.removebtn}>Remove</button></p>
                </div>
            </div>
        </main>
    )
}