import React, { useState, useEffect } from 'react'
import LoginWidget from './Login'
import RegisterWidget from './Register'

const LoginIndex: React.FC = () => {
    const [widgetType, setWidgetType] = useState('LoginWidget')
    const [isAlert, setIsAlert] = useState(false)
    const [alertLogin, setAlertLogin] = useState('')
    const [alertRegister, setAlertRegister] = useState('')
    const [fixCss, setFixCss] = useState(false)

    useEffect(() => {
        document.title = 'Money Manager - Logowanie'
        setTimeout(() => {
            setFixCss(true)
        }, 100)
    }, [])

    useEffect(() => {
        msgCallback()
    }, [alertLogin, alertRegister])

    const msgCallback = () => {
        if(alertLogin.length || alertRegister.length) {
            setIsAlert(true)
        } else {
            setIsAlert(false)
        }
    }

    return (
        <div className="view-login-container">
            <div className="bg-outside">
                <div className="bg-awesome">
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-element">
                        <div className="bg-inner"></div>
                    </div>
                </div>
            </div>
            <div className={"inner-box" + (isAlert ? " is-alert" : '') + (fixCss ? ' fix' : '')}>
                <div className={widgetType !== 'LoginWidget' ? 'hidden' : ''}>
                    <LoginWidget alertMsg={data => setAlertLogin(data)} />
                    <div className="acc-ask">
                        <button
                            type="button"
                            className="clear-btn"
                            onClick={() => setWidgetType('RegisterWidget')}
                        >Nie masz konta? Zarejestruj się
                        </button>
                    </div>
                </div>
                <div className={widgetType !== 'RegisterWidget' ? 'hidden' : ''}>
                    <RegisterWidget alertMsg={data => setAlertRegister(data)} />
                    <div className="acc-ask">
                        <button
                            type="button"
                            className="clear-btn"
                            onClick={() => setWidgetType('LoginWidget')}
                        >Posiadasz już konto? Zaloguj się
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginIndex
