import React, { useState, useEffect } from 'react'
import LoginWidget from './Login'
import RegisterWidget from './Register'

const LoginIndex: React.FC = () => {
    const [widgetType, setWidgetType] = useState('LoginWidget')

    useEffect(() => {
        document.title = 'Money Manager - Logowanie'
    }, [])

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
            <div className="inner-box">
                <div className={widgetType !== 'LoginWidget' ? 'hidden' : ''}>
                    <LoginWidget />
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
                    <RegisterWidget />
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
