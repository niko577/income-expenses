import React, { useContext, FC } from 'react'
import { Snackbar } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalContext'

const SnackBarElement: FC = () => {
    const { setSnackbarVisibility, snackbarVisibility, snackbarMessage } = useContext(GlobalContext)

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={snackbarVisibility}
            autoHideDuration={3000}
            message={snackbarMessage}
            onClose={() => setSnackbarVisibility(false)}
        />
    )
}

export default SnackBarElement
