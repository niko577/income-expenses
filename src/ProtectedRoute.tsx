import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalContext } from './context/GlobalContext'

interface IProtectedRoute {
  exact: boolean
  path: string
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...rest }) => {
    const { authorization } = useContext(GlobalContext)

    if (authorization) {
        return <Route {...rest} render={() => children} />
    }
    if (!authorization) {
        return (
            <Route
                {...rest}
                render={({ location }) => (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )}
            />
        )
    }
    return null
}

export default ProtectedRoute
