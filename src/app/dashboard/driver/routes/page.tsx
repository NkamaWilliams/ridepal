'use client'
import styles from "@/styles/dashboard.module.css"
import Rate from "@/components/general/rate"
import Button from "@/components/general/button"
import Alert from "@/components/general/alert"
import Loading from "@/components/general/loading"
import { FormEvent, useState, useEffect } from "react"
import endpoint from "@/resources/api-endpoint.json"

interface rideInfo {
    startTime: string,
    passengers: passenger[],
    status: "pending" | "ongoing",
    rideId: string
}

interface passenger{
    id: string, 
    workAddress: string, 
    workEmail: string, 
    email: string, 
    workID: string, 
    firstName: string, 
    lastName: string, 
    profession: string, 
    phoneNumber: string, 
    companyName: string
}

interface alertInter{
    type: 1|2,
    message: string,
}

export default function Route(){
    const [viewRate, setViewRate] = useState<boolean>(true)
    const [rideDetails, setRideDetails] = useState<rideInfo|null>(null)
    const [hideAlert, setHideAlert] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [alert, setAlert] = useState<alertInter>({type: 1, message: ""})
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const closeRate = () => {
        setViewRate(false)
    }
    const start = async () => {
        const api = endpoint + "driver/start-ride/"
        const token = sessionStorage.getItem("token")
        let altType: 1|2 = 1
        const raw2 = {
            rideId: rideDetails?.rideId,
        }
        try{
            const req = {
                method: 'POST',
                // body: raw2,
                body: JSON.stringify(raw2),
                headers: {
                    authorization: `Bearer ${token} backend`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(api, req);
            const data = await response.json();
            if (response.ok){
                setRideDetails({
                    startTime: data.ride.startTime,
                    passengers: data.ride.passengers,
                    status: data.ride.status,
                    rideId: data.ride.id 
                })
            }
            else{
                altType = 2
            }
            setAlert({type: altType, message: data.message})
            setHideAlert(false)
        } catch(e){
            console.error(e)
        } finally{
            setTimeout(() => {setHideAlert(true)}, 3500)
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
                    startTime: new Date(data.ride.startTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
                    passengers: data.ride.passengers,
                    status: data.ride.status ,
                    rideId: data.ride.id
                })
            }
        } catch(e){
            console.error(e)
        }
    }
    
    useEffect(() => {
        setLoading(true)
        onLoad("driver/pending-ride/")
        onLoad("driver/ongoing-ride/")
        setTimeout(() => {setLoading(false)}, 3000)
    }, [])
    return(
        <main className={styles.main}>
        {loading && <Loading />}
        <Alert type={alert.type} message={alert.message} hide={hideAlert}/>
            {/* {viewRate && <Rate handleClick={closeRate}/>} */}
            <h1>Active Routes</h1>

            {rideDetails != null && 
            <div className={styles.route}>
                <div>
                    <p><b>Departure Time</b></p>
                    <p>{rideDetails.startTime}</p>
                </div>

                <div className={styles.stops}>
                    <p><b>Passengers</b></p>
                    {
                        rideDetails?.passengers.map(passenger => 
                            <p key={passenger.id}>{passenger.firstName + " " + passenger.lastName}</p>
                        )
                    }

                    {
                        rideDetails?.passengers.length == 0 &&
                        <p>No passengers will be on this ride!</p>
                    }
                </div>

                {rideDetails?.status == "ongoing" &&<div>
                    <Button text="Cancel Ride" design={2}/>
                    <Button text="Route Completed"/>
                </div>}

                {rideDetails?.status == "pending" &&<div>
                    <Button functionality={() => {start()}} text="Start Ride"/>
                </div>}
            </div>
            }

            {rideDetails == null && <p>No active route!</p>}
        </main>
    )
}