'use client'
import styles from "@/styles/dashboard.module.css"
import { useAppContext } from "@/components/general/appcontext"
import TextSelect from "@/components/form/text-select"
import Button from "@/components/general/button"
import Icon from "@/components/general/icon"
import Loading from "@/components/general/loading"
import Alert from "@/components/general/alert"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import endpoint from "@/resources/api-endpoint.json"

interface SelectionProp{
    name: string,
    car: string,
    plates: string,
    details: string,
    seats: number,
    id: string,
    driverId?: string,
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
                setRoutes(data.routes);
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
                    <Selection key={details.ride.vehicle.plateNumber} name={details.driver.firstName} car={details.ride.vehicle.model} plates={details.ride.vehicle.plateNumber} details={details.ride.instruction} seats={details.ride.seatAvailable} id={details.id} driverId={details.driver.driverId}/>
                )}
                {routes.length < 1 && 
                    <p>No routes found!</p>
                }
            </div>
        </div>}
        </>
    )
}

function Selection({name, car, plates, details, seats, id, driverId}: SelectionProp){
    const [viewPopup, setViewPopup] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [hideAlert, setAlert] = useState<boolean>(true)
    const [type, setType] = useState<1|2>(1)
    const [message, setMessage] = useState<string>("")
    const [ratings, setRatings] = useState<number>(0)
    const route = useRouter()
    
    const getRating = async () => {
        const api = `${endpoint}rating/ratings/${driverId}`;
        const req = {
            method: "GET"
        }
        try{
            const response = await fetch(api, req)
            if (response.ok){
                const data = await response.json()
                setRatings(data.ratings)
            }
        } catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getRating()
    }, [])

    //Joining a ride
    const handleJoin = async () => {
        const api = `${endpoint}passenger/join-ride/`
        const raw = {
            routeId: id,
        }
        const token = sessionStorage.getItem("token")
        try{
            setLoading(true)
            const requestOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token} backend`
                },
                body: JSON.stringify(raw),
            }
            const response = await fetch(api, requestOptions)
            
            if (response.ok){
                setType(1)
                setMessage("Successfully booked a ride! Have a nice trip!")
            }

            else if (response.status == 403){
                setType(2)
                setMessage("You have already booked a ride!")
                setTimeout(() => {
                    setAlert(true)
                    route.push("/dashboard/rider/routes")
                }, 3500)
            }
            
            else{
                setType(2)
                const data = await response.json()
                setMessage(data.message)
            }
            setAlert(false)
            setViewPopup(false)

        } catch(err){
            console.error(err)
        } finally{
            setLoading(false)
            setTimeout(() => {setAlert(true)}, 3500)
        }
    }
    return(
        <>
        <div onClick={() => {setViewPopup(true)}} className={styles.selection}>
            {loading && <Loading />}
            <Alert type={type} message={message} hide={hideAlert}/>
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
                    <p><b>Seats Available:</b> {seats}</p>
                    <p><b>Ratings:</b> {ratings.toFixed(1)} / 5</p>
                </div>

                <div className={styles.btn}>
                    <Button functionality={handleJoin} text="Book Ride" design={2}/>
                </div>
            </div>
        </div>}
        </>
    )
}