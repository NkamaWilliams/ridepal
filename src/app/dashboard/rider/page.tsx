'use client'
import styles from "@/styles/dashboard.module.css"
import { useAppContext } from "@/components/general/appcontext"
import TextSelect from "@/components/form/text-select"
import Button from "@/components/general/button"
import DateTime from "@/components/form/date-time"
import { useState } from "react"
import Icon from "@/components/general/icon"

interface SelectionProp{
    name: string,
    car: string,
    plates: string,
    details: string,
}

export default function Driver(){
    const context = useAppContext()
    const [viewResults, setViewResults] = useState(false)
    const info = [
        {
            "Name": "My Driver",
            "Car": "Toyota Camry",
            "Plate Number": "CV452JKJ",
            "Details": "There is an AC. Everyone is expected to keep silent throughout the ride."
        },
        {
            "Name": "My Driver",
            "Car": "Toyota Camry",
            "Plate Number": "CV452JKJ",
            "Details": "There is an AC. Everyone is expected to keep silent throughout the ride."
        },
        {
            "Name": "My Driver",
            "Car": "Toyota Camry",
            "Plate Number": "CV452JKJ",
            "Details": "There is an AC. Everyone is expected to keep silent throughout the ride."
        }
    ]
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return(
        <>
        {!viewResults && <main className={styles.main}>
            <h1>Hello, {context.username}</h1>

            <form onSubmit={handleSubmit} method="post">
                <h3>Find a route</h3>
                <TextSelect name="pickup" label="Pickup Location" type="search" />
                <TextSelect name="drop" label="Drop Location" type="search" />
                <DateTime />
                <Button functionality={() => {setViewResults(true)}} text="Search" />
            </form>

        </main>}

        {viewResults && <div className={styles.results}>
            <div className={styles.back}>
                <Button functionality={() => {setViewResults(false)}} text="< Go Back"/>
            </div>

            <h2>Results</h2>

            <div className={styles.group}>
                {info.map(details => 
                    <Selection key={details["Plate Number"]} name={details.Name} car={details.Car} plates={details["Plate Number"]} details={details.Details}/>
                )}
            </div>
        </div>}
        </>
    )
}

function Selection({name, car, plates, details}: SelectionProp){
    const [viewPopup, setViewPopup] = useState<boolean>(false)
    return(
        <>
        <div onClick={() => {setViewPopup(true)}} className={styles.selection}>
            <h3>{name}</h3>
            <div className={styles.summary}>
                <p>{car}</p>
                <p>{plates}</p>
            </div>
        </div>

        {viewPopup && <div className={styles.popup}>
            <div className={styles.details}>
                <div className={styles.close} onClick={() => {setViewPopup(false)}}>
                    <Icon small src="/assets/close.png"/>
                </div>
                <h2>{name}</h2>
                <h3>{car}</h3>

                <p>{details}</p><br/>

                <div>
                    <p><b>Departure Time: </b> 12:00pm</p>
                    <p><b>Seats Available:</b> 4</p>
                </div>

                <div className={styles.btn}>
                    <Button functionality={() => {setViewPopup(false)}} text="Book Ride" design={2}/>
                </div>
            </div>
        </div>}
        </>
    )
}