import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Update from '../pages/Update/Update'


function route() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/update/:id' component={Update} />
            </Switch>
        </Router>
    )
}

export default route
