import styles from "@/styles/general/button.module.css"

interface props{
    text: string,
}

export default function Button({text}: props){
    return(
        <button className={styles.btn}>
            {text}
        </button>
    )
}