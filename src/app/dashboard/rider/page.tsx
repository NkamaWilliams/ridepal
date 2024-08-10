'use client'
import styles from "@/styles/dashboard.module.css"
import { useAppContext } from "@/components/general/appcontext"
import TextSelect from "@/components/form/text-select"
import Button from "@/components/general/button"
import endpoint from "@/resources/api-endpoint.json"
import { useState } from "react"
import Icon from "@/components/general/icon"

interface SelectionProp{
    name: string,
    car: string,
    plates: string,
    details: string,
}

interface driverInfo{
    driverId: string,
    firstName: string,
    lastName: string|null,
    email: string,
    company: string
}

interface rideInfo{
    id: string,
    startTime: string,
    vehicle: vehicleInfo,
    seatAvailable: number,
    instruction: string,
}

interface vehicleInfo{
    plateNumber: string,
    seatNumber: number,
    color: string,
    model: string,
    ownerId: string,
}

interface routeInfo{
    id: string,
    startPoint: string,
    destination: string,
    driver: driverInfo,
    ride: rideInfo,
    publishedAt: string,
}

export default function Driver(){
    const context = useAppContext()
    const [viewResults, setViewResults] = useState(false)
    const [routes, setRoutes] = useState<routeInfo[]>([])
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const api = `${endpoint}passenger/select-routes/`
        const token = sessionStorage.getItem("token")
        const entries = Object.fromEntries(new FormData(e.currentTarget).entries())
        const raw = {
        "source": entries["source"].toString(),
        "destination": entries["destination"].toString(),
        }
        try{
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token} backend`
                },
                body: JSON.stringify(raw),
            }
            const response = await fetch(api, requestOptions)
            if (response.ok){
                console.log("Search Complete!");
                const data = await response.json();
                console.log(data);
                if (data.routes.length > 1){
                    setRoutes(data.routes);
                }
            }
        } catch(e){
            console.error(e)
        } finally{
            setViewResults(true)
        }
    }
    return(
        <>
        {!viewResults && <main className={styles.main}>
            <h1>Hello, {context.username}</h1>

            <form onSubmit={handleSubmit} method="post">
                <h3>Find a route</h3>
                <TextSelect name="source" label="Pickup Location" type="search" />
                <TextSelect name="destination" label="Drop Location" type="search" />
                <Button text="Search" />
            </form>

        </main>}

        {viewResults && <div className={styles.results}>
            <div className={styles.back}>
                <Button functionality={() => {setViewResults(false)}} text="< Go Back"/>
            </div>

            <h2>Results</h2>

            <div className={styles.group}>
                {routes.map(details => 
                    <Selection key={details.ride.vehicle.plateNumber} name={details.driver.firstName} car={details.ride.vehicle.model} plates={details.ride.vehicle.plateNumber} details={details.ride.instruction}/>
                )}
                {routes.length < 1 && 
                    <p>No routes found!</p>
                }
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