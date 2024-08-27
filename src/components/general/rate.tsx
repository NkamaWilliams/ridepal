'use client'
import styles from "@/styles/general/rate.module.css"
import Button from "./button"
import endpoint from "@/resources/api-endpoint.json"
import Loading from "./loading"
import { useState } from "react"

interface props{
    handleClick?: () => void,
    rideId: string,
    passengerId?: string[],
    view: boolean
}

export default function Rate({handleClick, rideId, passengerId, view}:props){
    const stars = [1, 2, 3, 4, 5]
    const [currentStar, setStar] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = () => {
        setLoading(true)
        if (passengerId){
            passengerId.forEach(passenger => 
                ratePassenger(passenger)
            )
        }
        else{
            rateDriver()
        }
    }

    const ratePassenger = async (id:string) => {
        const api = endpoint + `rating/rate-passenger/`
        const token = sessionStorage.getItem("token")
        const raw = {
            rideId: rideId,
            rating: currentStar,
            passengerId: id
        }
        try{
            const req = {
                method: 'POST',
                body: JSON.stringify(raw),
                headers: {
                    authorization: `Bearer ${token} backend`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(api, req);
            const data = await response.json();
            if (response.ok){
                console.log("Passenger rated successfully!")
            }
            else{
                console.log("Failed to rate passenger")
            }
        } catch(e){
            console.error(e)
        } finally{
            setLoading(false)
        }
    }

    const rateDriver = async () => {
        const api = endpoint + `rating/rate-passenger/`
        const token = sessionStorage.getItem("token")
        const raw = {
            rideId: rideId,
            rating: currentStar
        }
        try{
            const req = {
                method: 'POST',
                body: JSON.stringify(raw),
                headers: {
                    authorization: `Bearer ${token} backend`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(api, req);
            const data = await response.json();
            if (response.ok){
                console.log("Driver rated successfully!")
            }
            else{
                console.log("Failed to rate Driver")
            }
        } catch(e){
            console.error(e)
        } finally{
            setLoading(false)
        }
    }

    return(
        <main className={`${styles.rate} ${view && styles.hide}`}>
            {loading && <Loading />}
            <div>
                <h1>Rate your Experience!</h1>

                <div className={styles.stars}>
                    {stars.map(star => 
                        <p
                        key={star}
                        className={`${currentStar>=star && styles.selected}`}
                        onClick={() => {setStar(star)}} >⭐</p>
                    )}
                {/* 🌟🌟⭐ */}
                </div>

                <Button design={2} text="Confirm" functionality={() => {
                    handleSubmit()
                    if (handleClick){
                        handleClick()
                    }
                }}/>
            </div>
        </main>
    )
}