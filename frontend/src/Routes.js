import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/core/Home'
import SignUp from './components/user/SignUp'
import SignIn from './components/user/SignIn'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={SignIn}/>
                <Route path="/signup" exact component={SignUp}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes