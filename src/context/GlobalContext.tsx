import React, { createContext, useState, FC, useEffect } from 'react'
import axios from 'axios'
import { colors, categoryIconList, accountIconList, convertMonths, prettyPrice } from '../helpers'
import env from '../env'

export const GlobalContext = createContext<any>(null)

const GlobalCtx: FC = ({ children }) => {
    const [loader, setLoader] = useState(false)
    const [snackbarVisibility, setSnackbarVisibility] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [token, setToken] = useState('')
    const [authorization, setAuthorization] = useState(false)
    const [csvModal, setCsvModal] = useState(false)
    const [userData, setUserData] = useState()

    useEffect(() => {
        checkToken()
    }, [])
    useEffect(() => {
    }, [authorization])

    const checkToken = (): void => {
        const tokenFromStorage: string | null = localStorage.getItem('token')

        if (tokenFromStorage) {
            setToken(tokenFromStorage)
        } else {
            setToken('empty')
        }
    }

    const setNewToken = (newToken: string): void => {
        localStorage.setItem('token', newToken)
        checkToken()
    }

    const showSnackbar = (text: string) => {
        setSnackbarMessage(text)
        setSnackbarVisibility(true)
    }

    const DISPATCH = async (type?: string, endpoint?: string, data?: any) => {
        switch (type) {
        case 'get': {
            setLoader(true)
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
            setLoader(false)
            return result
        }

        case 'post': {
            setLoader(true)
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
            setLoader(false)
            return result
        }

        case 'put': {
            setLoader(true)
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
            setLoader(false)
            return result
        }

        case 'delete': {
            setLoader(true)
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
            setLoader(false)
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
        colors,
        categoryIconList,
        accountIconList,
        loader,
        setLoader,
        snackbarVisibility,
        setSnackbarVisibility,
        showSnackbar,
        snackbarMessage,
        token,
        convertMonths,
        authorization,
        prettyPrice,
        setNewToken,
        setAuthorization,
        csvModal,
        setCsvModal,
        userData, 
        setUserData
    }

    return (
        <GlobalContext.Provider value={vProvider}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalCtx
