'use client'
import styles from "@/styles/form/form.module.css"
import { useState } from "react"

interface props{
    label?: string,
    type?: "text"|"password"|"email"|"search"|"area",
    name: string,
    pattern?: string,
    required?: boolean
}

//The TextSelect component is designed for receiving email, text and password only input
export default function TextSelect({label, type="text", name, pattern, required = true}:props){
    const [hidden, setHidden] = useState<boolean>(true)
    const [value, setValue] = useState<string>("")
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    //Current implementation does not require dropdown content
    const handleClick = () => {
        // setHidden(!hidden)
    }
    return(
        <section className={styles.dropdown}>
            <div className={styles.inputGroup}>
                <label htmlFor={label} className={styles.bold}>{label}</label>
                {type != "area" && <input
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
                pattern={pattern}
                value={value}/>}

                {type == "area" && <textarea
                onInput={(e) => {
                    setValue(e.currentTarget.value)
                }}
                title={label}
                name={name}></textarea>}
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