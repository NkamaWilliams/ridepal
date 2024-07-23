import Image from "next/image";
import styles from "@/styles/general/icon.module.css"

interface props{
    mobileOnly?: boolean //If set Icon only shows on mobile and tablet
    src?: string,
    small?: boolean,
}

export default function Icon({mobileOnly = false, src="/assets/menu.svg", small=false}:props){
    return(
        <div className={`${styles.icon} ${mobileOnly && styles.mobileOnly} ${small && styles.small}`}>
            <Image src={src} alt="icon" fill />
        </div>
    )
}