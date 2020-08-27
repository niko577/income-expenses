import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

import Container from './components/Container'
import Accounts from './views/Accounts/Index'
import Categories from './views/Categories/Index'
import CategoriesDetails from './views/Categories/Details'
import Transactions from './views/Transactions/Index'
import Dashboard from './views/Dashboard/Index'
import Login from './views/Login/Index'

import { GlobalContext } from './context/GlobalContext'

import LoaderElement from './components/LoaderElement'
import SnackbarElement from './components/SnackbarElement'
import GetCSV from './components/GetCSV'

const App: React.FC = () => {
    const { DISPATCH, setLoader, token, setAuthorization, authorization } = useContext(GlobalContext)
    const [checking, setChecking] = useState(true)

    const checkToken = async () => {
        const response = await DISPATCH('post', '/auth/ping')
        if (response !== null) {
            setAuthorization(true)
        } else {
            setAuthorization(false)
        }
        setChecking(false)
        setLoader(false)
    }

    useEffect(() => {
        setLoader(true)
        if (token !== '') {
            checkToken()
        }
        // eslint-disable-next-line
    }, [token])

    return (
        <>
            <LoaderElement />
            <SnackbarElement />
            <GetCSV />
            {!checking && (
                <div>
                    <Router>
                        <Switch>
                            {!authorization && (
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                            )}
                            <ProtectedRoute exact path="/dashboard">
                                <Container name="Strona główna">
                                    <Dashboard />
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/accounts">
                                <Container name="Konta">
                                    <Accounts />
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/categories">
                                <Container name="Kategorie">
                                    <Categories />
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/categories/:id">
                                <Container name="Szczegóły kategorii">
                                    <CategoriesDetails />
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/transactions">
                                <Container name="Transakcje">
                                    <Transactions />
                                </Container>
                            </ProtectedRoute>

                            {authorization ? (
                                <Redirect from="*" to="/dashboard" />
                            ) : (
                                <Redirect from="*" to="/login" />
                            )}
                        </Switch>
                    </Router>
                </div>
            )}
        </>
    )
}

export default App
