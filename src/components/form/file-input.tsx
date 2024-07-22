import styles from "@/styles/form/form.module.css"

interface props{
    label?: string,
    name: string,
}

//The TextInput component is designed for receiving files
export default function FileInput({label, name}:props){
    return(
        <div className={styles.inputGroup}>
            <label htmlFor={label}>{label}</label>
            <input alt="Work ID" id={label} type="file" name={name} />
        </div>
    )
}