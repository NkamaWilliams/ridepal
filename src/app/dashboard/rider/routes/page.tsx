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

interface prevRides{
    createdAt: string,
    driverId: string,
    endTime: string,
    id: string,
    instruction: string,
    passengers: string[],
    routeId: string,
    seatAvailable: number,
    startTime: string,
    status: "ongoing" | "pending" | "completed",
    updatedAt: string,
    vehicleId: string
}

interface alertInter{
    type: 1|2,
    message: string,
}

export default function Route(){
    const [viewRate, setViewRate] = useState<boolean>(true)
    const [rideDetails, setRideDetails] = useState<rideInfo|null>(null)
    const [rideDetails2, setRideDetails2] = useState<rideInfo|null>(null)
    const [prevRides, setPrevRides] = useState<prevRides[]>([])
    const [index, setIndex] = useState<number>(0)

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
                    setPrevRides(data.ride)
                    const recent = data.ride[data.ride.length - 1]
                    setIndex(data.ride.length - 1)
                    setRideDetails2({
                        startTime: new Date(recent.startTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
                        endTime: new Date(recent.endTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
                        instructions: recent.instruction,
                        status: recent.status ,
                        rideId: recent.id
                    })
                    console.log(recent)
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

    const handleNav = (num: number) => {
        setIndex(num + index)
        setRideDetails2({
            startTime: new Date(prevRides[num+index].startTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
            endTime: new Date(prevRides[num+index].endTime).toLocaleString([], {hour: "2-digit", minute: "2-digit", hour12: true}),
            instructions: prevRides[num+index].instruction,
            status: prevRides[num+index].status ,
            rideId: prevRides[num+index].id
        })
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

            <h1>Previous Rides</h1>

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

                <Button type="button" design={2} text="Rate Ride" functionality={() => {setViewRate(false)}}/>

                <div className={styles.navigate}>
                    <div><Button disabled={index == 0} type="button" design={1} text="Previous" functionality={() => {handleNav(-1)}}/></div>
                    <div><Button disabled={index == prevRides.length-1} type="button" design={1} text="Next" functionality={() => {handleNav(1)}}/></div>
                </div>
            </div>
            }

            {rideDetails2 == null && <p>No previous unrated ride!</p>}
        </main>
    )
}