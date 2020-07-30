import React, { useContext } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { GlobalContext } from '../context/GlobalContext'

const LoaderElement: React.FC = () => {
    const { loader } = useContext(GlobalContext)

    return (
        loader && (
            <div className="loader">
                <LinearProgress color="secondary" />
            </div>
        )
    )
}

export default LoaderElement
