import styles from "@/styles/general/button.module.css"

interface props{
    text: string,
    type?: "submit"|"reset"|"button",
    design?: number,
    functionality?: () => void,
}

export default function Button({text, type="submit", design=1, functionality}: props){
    return(
        <button onClick={functionality} type={type} className={`${styles.btn} ${design == 2 && styles.btn2}`}>
            {text}
        </button>
    )
}