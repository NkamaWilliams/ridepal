import Image from "next/image";
import styles from "@/styles/general/icon.module.css"

interface props{
    mobileOnly?: boolean //If set Icon only shows on mobile and tablet
}

export default function Icon({mobileOnly = false}:props){
    return(
        <div className={`${styles.icon} ${mobileOnly && styles.mobileOnly}`}>
            <Image src="/assets/menu.svg" alt="icon" fill />
        </div>
    )
}