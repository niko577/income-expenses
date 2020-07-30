import React, { createContext, FC,useState } from 'react'
import axios from 'axios'
import env from '../env'

export const GlobalContext = createContext<any>(null)

const GlobalCtx: FC = ({ children }) => {
    const [authorization, setAuthorization] = useState(false)
    const [token, setToken] = useState('')

    const DISPATCH = async (type?: string, endpoint?: string, data?: any) => {
        switch (type) {
        case 'get': {
            let result; let response;
            try {
                response = await axios.get(`${env}${endpoint}`, { 
                    headers: { Authorization: `Bearer ${token}` } 
                })
                result = response.data
            } catch (error) {
                console.log(error);
                result = null
            }
            return result
        }

        case 'post': {
            let result; let response;
            try {
                response = await axios.post(`${env}${endpoint}`, data, { 
                    headers: { Authorization: `Bearer ${token}` } 
                })
                result = response.data
            } catch (error) {
                console.log(error);
                result = null
            }
            return result
        }

        case 'put': {
            let result; let response;
            try {
                response = await axios.put(`${env}${endpoint}`, data, { 
                    headers: { Authorization: `Bearer ${token}` } 
                })
                result = response.data
            } catch (error) {
                console.log(error);
                result = null
            }
            return result
        }

        case 'delete': {
            let result; let response;
            try {
                response = await axios.delete(`${env}${endpoint}`, { 
                    headers: { Authorization: `Bearer ${token}` } 
                })
                result = response.data
            } catch (error) {
                console.log(error);
                result = null
            }
            return result
        }
        
        default:
            break;
        }
    }
    
    const vProvider = {
        DISPATCH,
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
