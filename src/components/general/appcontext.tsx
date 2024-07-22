'use client'
import { useState, useContext, createContext, ReactNode } from "react"

interface props{
    children: ReactNode
}

interface contextType{
    id: string;
    email: string;
    username: string;
    accessToken: string;
    setContext: (id: string, email: string, username: string, accessToken: string) => void 
}

const Context = createContext<contextType>({
    id: "",
    email: "",
    username: "",
    accessToken: "",
    setContext: () => {},
})

export default function AppContext({children}:props){
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [accessToken, setAccessToken] = useState("")

    const setContext = (id:string, email:string, username:string, accessToken:string) => {
        setId(id);
        setEmail(email);
        setUsername(username);
        setAccessToken(accessToken);
    }
    return(
        <Context.Provider value={{id, email, username, accessToken, setContext}}>
            {children}
        </Context.Provider>
    )
}

export const useAppContext = () => {
    return useContext(Context)
}