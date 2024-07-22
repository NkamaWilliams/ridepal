import styles from "@/styles/form/form.module.css"

interface props{
    label?: string,
    type?: "text"|"password"|"email",
    name: string,
    required?: boolean
}

//The TextInput component is designed for receiving email, text and password only input
export default function TextInput({label, type="text", name, required = true}:props){
    return(
        <div className={styles.inputGroup}>
            <label htmlFor={label}>{label}</label>
            <input id={label} type={type} name={name} required={required}/>
        </div>
    )
}