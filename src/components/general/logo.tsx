import styles from "@/styles/general/logo.module.css"

interface props{
    inheritFont?: boolean,
}

export default function Logo({inheritFont}:props){
    return(
        <h2 className={`${styles.logo} ${inheritFont && styles.inheritFont}`}>
            Ride
            <span>Pal</span>
        </h2>
    )
}