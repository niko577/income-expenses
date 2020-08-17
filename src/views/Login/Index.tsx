import React, { useState } from 'react'
import LoginWidget from './Login'
import RegisterWidget from './Register'

const LoginIndex: React.FC = () => {
    const [widgetType, setWidgetType] = useState('LoginWidget')

    return (
        <div className="view-login-container">
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
