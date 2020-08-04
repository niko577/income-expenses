import React, { useRef } from 'react'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import { Route } from 'react-router-dom'
import MiniDrawer from './Drawer'
import TopAppBar from './TopBar'

const Container: React.FC<any> = ({ children, name }) => {
    const ref: any = useRef(null)

    const handleClick = () => {
        ref.current.toggleDrawer()
    }

    return (
        <div>
            <TopAppBar toggleDrawer={handleClick} name={name} />
            <MiniDrawer forwardRef={ref} />
            <main className="main-container">
                <div className="main-wrapper">
                    <Route render={({ location }) => (
                        <TransitionGroup>
                            <CSSTransition key={location.key} timeout={500} classNames="static-for-animation fade">
                                {children}
                            </CSSTransition>
                        </TransitionGroup>
                    )}
                    />
                </div>
            </main>
        </div>
    )
}

export default Container
