'use client'
import styles from "@/styles/form/form.module.css"
import { useState } from "react"

interface props{
    label?: string,
    type?: "text"|"password"|"email"|"search",
    name: string,
    required?: boolean
}

//The TextSelect component is designed for receiving email, text and password only input
export default function TextSelect({label, type="text", name, required = true}:props){
    const [hidden, setHidden] = useState<boolean>(true)
    const [value, setValue] = useState<string>("")
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const handleClick = () => {
        setHidden(!hidden)
    }
    return(
        <section className={styles.dropdown}>
            <div className={styles.inputGroup}>
                <label htmlFor={label} className={styles.bold}>{label}</label>
                <input
                className={`${type == "search" && styles.search}`}
                onClick={handleClick}
                onInput={(e) => {
                    setValue(e.currentTarget.value)
                }}
                id={label}
                type={type}
                name={name}
                required={required}
                autoComplete="off"
                value={value}/>
            </div>

            <div className={`${styles.dropdownContent} ${hidden && styles.hide}`}>
                {arr.map(member => 
                    <button
                    type="button"
                    onClick={() => {
                        setValue(`Random address of a place ${member}`)
                        setHidden(true)
                    }}
                    key={member}>
                        <h4>Name of place</h4>
                        <p className={styles.address}>Random address of a place {member}</p>
                    </button>
                )}
            </div>
        </section>
    )
}