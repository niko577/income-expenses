import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

import Container from './components/Container'
import Login from './views/Login/Index'

import { GlobalContext } from './context/GlobalContext'

import LoaderElement from './components/LoaderElement'

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
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/accounts">
                                <Container name="Konta">
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/categories">
                                <Container name="Kategorie">
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/categories/:id">
                                <Container name="Szczegóły kategorii">
                                </Container>
                            </ProtectedRoute>
                            <ProtectedRoute exact path="/transactions">
                                <Container name="Transakcje">
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
