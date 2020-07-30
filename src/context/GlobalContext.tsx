import React, { createContext, FC,useState } from 'react'
import axios from 'axios'
import env from '../env'

export const GlobalContext = createContext<any>(null)

const GlobalCtx: FC = ({ children }) => {
    const [authorization, setAuthorization] = useState(false)
    
    const vProvider = {
        env,
        axios,
        authorization,
        setAuthorization,
    }

    return (
        <GlobalContext.Provider value={vProvider}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalCtx
