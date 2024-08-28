'use client'
import styles from "@/styles/dashboard.module.css"
import Button from "@/components/general/button"
import Alert from "@/components/general/alert"
import Loading from "@/components/general/loading"
import Rate from "@/components/general/rate"
import endpoint from "@/resources/api-endpoint.json"
import { useState, useEffect } from "react"

interface rideInfo {
    startTime: string,
    endTime?: string,
    status: "pending" | "ongoing" | "completed",
    rideId: string,
    instructions: string
}

interface alertInter{
    type: 1|2,
    message: string,
}

export default function Route(){
    const [viewRate, setViewRate] = useState<boolean>(true)
    const [rideDetails, setRideDetails] = useState<rideInfo|null>(null)
    const [rideDetails2, setRideDetails2] = useState<rideInfo|null>(null)

    const [hideAlert, setHideAlert] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [alert, setAlert] = useState<alertInter>({type: 1, message: ""})

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
                if (routeEnd == "passenger/last-joined-completed-ride/"){
                    setRideDetails2({
                        startTime: new Date(data.ride.startTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
                        endTime: new Date(data.ride.endTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
                        instructions: data.ride.instruction,
                        status: data.ride.status ,
                        rideId: data.ride.id
                    })
                }
                else{
                    setRideDetails({
                        startTime: new Date(data.ride.startTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
                        instructions: data.ride.instruction,
                        status: data.ride.status ,
                        rideId: data.ride.id
                    })
                }
            }
        } catch(e){
            console.error(e)
        }
    }
    
    useEffect(() => {
        setLoading(true)
        onLoad("passenger/non-completed-ride/")
        onLoad("passenger/last-joined-completed-ride/")
        setTimeout(() => {setLoading(false)}, 3000)
    }, [])
    return(
        <main className={styles.main}>
            {loading && <Loading />}
            <Alert type={alert.type} message={alert.message} hide={hideAlert}/>
            <Rate handleClick={setViewRate} view={viewRate} rideId={rideDetails2?.rideId??""}/>

            <h1>Current Rides</h1>

            {rideDetails != null && 
            <div className={styles.route}>
                <div>
                    <p><b>Departure Time</b></p>
                    <p>{rideDetails.startTime}</p>
                </div>

                <div className={styles.stops}>
                    <p><b>Instruction</b></p>
                    <p>{rideDetails.instructions}</p>
                </div>

                <div className={styles.stops}>
                    <p><b>Status</b></p>
                    <p>{rideDetails.status == "pending" ? "Not started yet!" : "In Progress!"}</p>
                </div>
            </div>
            }

            {rideDetails == null && <p>No active ride!</p>}

            <h1>Previous Ride</h1>

            {rideDetails2 != null && 
            <div className={styles.route}>
                <div>
                    <p><b>Started</b></p>
                    <p>{rideDetails2.startTime}</p>
                </div>

                <div>
                    <p><b>Ended</b></p>
                    <p>{rideDetails2.endTime}</p>
                </div>

                <div className={styles.stops}>
                    <p><b>Instruction</b></p>
                    <p>{rideDetails2.instructions}</p>
                </div>

                <div className={styles.stops}>
                    <p><b>Status</b></p>
                    <p>Completed</p>
                </div>

                <Button type="button" design={2} text="Rate Previous Ride" functionality={() => {setViewRate(false)}}/>
            </div>
            }

            {rideDetails2 == null && <p>No previus unrated ride!</p>}
        </main>
    )
}