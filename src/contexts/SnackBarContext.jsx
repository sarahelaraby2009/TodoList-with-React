import { createContext, useState } from "react";
import SnackBar from "../components/SnackBar";


export const SnackBarContext = createContext({})

export const SnackBarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showSnack = (message) => {
        setOpen(true)

        setMessage(message)
        setTimeout(() => {
            setOpen(false)
        }, 2000)



    }

    return (
        <>
            <SnackBarContext.Provider value={{showSnack}}>
                <SnackBar openSnackBar={open} message={message} />
                {children}
            </SnackBarContext.Provider>
        </>
    )
}
