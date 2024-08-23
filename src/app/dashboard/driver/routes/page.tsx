'use client'
import styles from "@/styles/dashboard.module.css"
import Rate from "@/components/general/rate"
import Button from "@/components/general/button"
import { FormEvent, useState, useEffect } from "react"
import endpoint from "@/resources/api-endpoint.json"
import { redirect } from "next/dist/server/api-utils"

interface rideInfo {
    startTime: string,
    passengers: string[],
    status: "pending" | "ongoing",
    rideId: string
}

export default function Route(){
    const [viewRate, setViewRate] = useState<boolean>(true)
    const [rideDetails, setRideDetails] = useState<rideInfo|null>(null)
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const closeRate = () => {
        setViewRate(false)
    }
    const start = async () => {
        const api = endpoint + "driver/start-ride/"
        const token = sessionStorage.getItem("token")
        const raw = {
            rideId: rideDetails?.rideId
        }
        try{
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(raw),
                headers: {
                    authorization: `Bearer ${token} backend`
                }
            };
            const response = await fetch(api, requestOptions);
            const data = await response.json();
            if (response.ok){
                setRideDetails({
                    startTime: data.ride.startTime,
                    passengers: data.ride.passengers,
                    status: data.ride.status,
                    rideId: data.ride.routeId 
                })
            }
        } catch(e){
            console.error(e)
        }
    }

    const onLoad = async (routeEnd: string) => {
        const api = endpoint + routeEnd
        const token = sessionStorage.getItem("token")
        try{
            const requestOptions = {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token} backend`
                  }
            };
            const response = await fetch(api, requestOptions);
            if (response.ok){
                const data = await response.json();
                setRideDetails({
                    startTime: data.ride.startTime,
                    passengers: data.ride.passengers,
                    status: data.ride.status ,
                    rideId: data.ride.routeId
                })
            }
        } catch(e){
            console.error(e)
        }
    }
    useEffect(() => {
        onLoad("driver/pending-ride/")
        onLoad("driver/ongoing-ride/")
    }, [])
    return(
        <main className={styles.main}>
            {/* {viewRate && <Rate handleClick={closeRate}/>} */}
            <h1>Active Routes</h1>

            <div className={styles.route}>
                <div>
                    <p><b>Departure Time</b></p>
                    <p>10:00 AM</p>
                </div>

                <div className={styles.stops}>
                    <p><b>Passengers</b></p>
                    <p> John Doe</p>
                    <p> John Doe</p>
                    <p> John Doe</p>
                </div>

                {rideDetails?.status == "ongoing" &&<div>
                    <Button text="Cancel Ride" design={2}/>
                    <Button text="Route Completed"/>
                </div>}

                {rideDetails?.status == "pending" &&<div>
                    <Button functionality={() => {start()}} text="Start Ride"/>
                </div>}
            </div>
        </main>
    )
}