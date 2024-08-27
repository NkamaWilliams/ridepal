'use client'
import styles from "@/styles/dashboard.module.css"
import formStyles from "@/styles/form/form.module.css"
import { useAppContext } from "@/components/general/appcontext"
import TextSelect from "@/components/form/text-select"
import Icon from "@/components/general/icon"
import Button from "@/components/general/button"
import Alert from "@/components/general/alert"
import { SetStateAction, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import endpoint from "@/resources/api-endpoint.json"
import Loading from "@/components/general/loading"

interface stopProps{
    func: React.Dispatch<SetStateAction<string[]>>,
    close: () => void,
    routes: string[]
}

interface alert{
    type: 1|2,
    message: string,
}

export default function Driver(){
    const context = useAppContext()
    const route = useRouter()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [routes, setRoutes] = useState<string[]>([])
    const [stops, setStops] = useState<boolean>(false)
    const [hideAlert, setHideAlert] = useState<boolean>(true)
    const [alert, setAlert] = useState<alert>({type:1, message:"Route created successfully!"})
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const entries = Object.fromEntries(new FormData(e.currentTarget).entries())
        const raw = {
        "startPoint": entries["startPoint"].toString(),
        "destination": entries["destination"].toString(),
        "routes": routes,
        "vehicleId": sessionStorage.getItem("v-id"),
        "seatAvailable": entries["seatAvailable"].toString(),
        "instruction": entries["instruction"].toString(),
        }
        const api = endpoint + "route/publish"
        const token = sessionStorage.getItem("token")
        try{
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token} backend`
                },
                body: JSON.stringify(raw),
            }
            const response = await fetch(api, requestOptions)
            if (response.ok){
                console.log("SUCCESS PEOPLE!");
                setAlert({type:1, message:"Route created successfully!"})
            }
            else{
                const result = JSON.parse(await response.text())
                console.log(result)
                setAlert({type:2, message:result.code == 403 ? "Routes can only be created after verification of account!" : "Failed to create route! Check for unfinished routes!"})
            }
        } catch(e){
            console.error(e)
            console.log("I Failed!")
        } finally{
            setLoading(false)
            setHideAlert(false)
            setTimeout(() => {setHideAlert(true)}, 3500)
        }
    }

    const closeStops = () => {
        setStops(false)
    }
    const openStops = () => {
        setStops(true)
    }

    const get = (info:string) => {
        return sessionStorage.getItem(info)?? ""
    }

    useEffect(() => {
        context.setContext(get("id"), "", get("username"), get("token"))
    })
    return(
        <main className={styles.main}>
            <Alert type={alert.type} message={alert.message} hide={hideAlert}/>
            {isLoading && <Loading/>}
            <h1>Welcome back, {context.username}</h1>

            <form onSubmit={handleSubmit} method="post" autoComplete="off">
                <h3>Publish a route</h3>
                <TextSelect name="startPoint" label="TakeOff" type="search" />
                <TextSelect name="destination" label="Destination" type="search" />
                <TextSelect name="seatAvailable" pattern="\d+" label="Seats Available" type="text"/>
                <TextSelect required={true} name="instruction" label="Instructions" type="area" />
                {stops && <Stops func={setRoutes} close={closeStops} routes={routes}/>}
                <Button functionality={openStops} text="Add Stops" type="button" design={2}/>
                <Button text="Publish" />
            </form>

        </main>
    )
}

function Stops({func, close, routes}: stopProps){
    const [value, setValue] = useState<string>("")
    const handleRemove = (e:string) => {
        func(routes.filter(route => route != e))
    }
    return(
        <div className={styles.busStops}>
            <div className={styles.choices}>
                <div onClick={close} className={styles.close}>
                    <Icon small src="/assets/close.png"/>
                </div>
                <h3>Add all stops!</h3>

                <div className={styles.stopList}>
                    {
                        routes.map(route => 
                            <p key={route.toUpperCase()}>{route} <button 
                            onClick={() => {handleRemove(route)}} type="button" className={styles.removebtn}>—</button></p>
                        )
                    }
                </div>

                <div className={formStyles.inputGroup}>
                    <label htmlFor="add"><b>Add Stop</b></label>
                    <input
                    onChange={(e) => {setValue(e.target.value)}}
                     value={value} type="text" name="route" id="add"></input>
                </div>
                <Button 
                functionality={
                    () => {
                        func([...routes, value])
                        setValue("")
                    }
                } 
                type="button" 
                text="Add" 
                design={2}/>
            </div>
        </div>
    )
}