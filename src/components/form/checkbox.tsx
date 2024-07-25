import styles from "@/styles/form/form.module.css"

interface props{
    label?: string,
    type?: "checkbox",
    name: string,
    required?: boolean,
    value?: string,
}

//The TextInput component is designed for receiving email, text and password only input
export default function Checkbox({label, type="checkbox", name, required = true, value=""}:props){
    return(
        <div className={styles.checkGroup}>
            <input id={label} type={type} name={name} required={required} value={value}/>
            <label htmlFor={label}>{label}</label>
        </div>
    )
}