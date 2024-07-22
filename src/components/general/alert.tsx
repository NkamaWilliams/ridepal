import styles from "@/styles/general/alert.module.css"

interface props{
    type: 1|2,
    message: string,
    hide?: boolean,
}

export default function Alert({type, message, hide=true}:props){
    return(
        <div className={`${styles.alert} ${(type==2) && styles.type2} ${!hide && styles.show}`}>
            <div>
                <h2>{type == 1 ? "SUCCESS" : "FAILED"}</h2>
                <p>{message}</p>
            </div>
        </div>
    )
}