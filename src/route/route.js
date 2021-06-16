import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'


function route() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
    )
}

export default route