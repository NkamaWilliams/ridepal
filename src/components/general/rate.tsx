'use client'
import styles from "@/styles/general/rate.module.css"
import Button from "./button"
import { useState } from "react"

interface props{
    handleClick?: () => void
}

export default function Rate({handleClick}:props){
    const stars = [1, 2, 3, 4, 5]
    const [currentStar, setStar] = useState<number>(0)
    return(
        <main className={styles.main}>
            <div>
                <h1>Rate your Experience!</h1>

                <div className={styles.stars}>
                    {stars.map(star => 
                        <p
                        key={star}
                        className={`${currentStar>=star && styles.selected}`}
                        onClick={() => {setStar(star)}} >⭐</p>
                    )}
                {/* 🌟 */}
                </div>

                <Button design={2} text="Confirm" functionality={handleClick}/>
            </div>
        </main>
    )
}