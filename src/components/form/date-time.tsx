import styles from "@/styles/form/form.module.css"

//The TextInput component is designed for receiving files
export default function DateTime(){
    return(
        <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.bold}>Date and time</label>
            <div className={styles.datetime}>
                <input alt="Date" id="date" title="date" type="date" required/>
                <input alt="Time" id="time" title="time" type="time" required/>
            </div>
        </div>
    )
}