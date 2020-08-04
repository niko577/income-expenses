import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/app.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import GlobalCtx from './context/GlobalContext'

ReactDOM.render(
    <BrowserRouter>
        <GlobalCtx>
            <App />
        </GlobalCtx>
    </BrowserRouter>,
    document.getElementById('root')
)
