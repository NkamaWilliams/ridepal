import styles from "@/styles/general/loading.module.css"
import Image from "next/image"

export default function Loading(){
    return(
        <div className={styles.loading}>
            <div className={styles.spinner}>
             <Image alt="loading" src="/assets/spinner.gif" fill/>
            </div>
            
        </div>
    )
}