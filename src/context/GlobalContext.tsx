import React, { createContext, FC } from 'react'
import axios from 'axios'
import env from '../env'

export const GlobalContext = createContext<any>(null)

const GlobalCtx: FC = ({ children }) => {
    
    const vProvider = {
        env,
        axios
    }

    return (
        <GlobalContext.Provider value={vProvider}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalCtx
