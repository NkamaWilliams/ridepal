import styles from "@/styles/form/form.module.css"

//The TextInput component is designed for receiving files
export default function DateTime(){
    return(
        <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.bold}>Date and time</label>
            <div className={styles.datetime}>
                {/* <input onChange={(e) => {console.log(e.target.value)}} alt="Date" id="date" title="date" type="date" required/>
                <input onChange={(e) => {console.log(e.target.value)}} alt="Time" id="time" title="time" type="time" required/> */}
                <input type="datetime-local" id="datetime" title="datetime" name="datetime"  onChange={(e) => {console.log(e.target.value)}}/>
            </div>
        </div>
    )
}