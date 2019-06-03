
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import IndexPage from "./views/IndexPage"
import LoginPage from "./views/LoginPage"

import "./common/common/common.styl"
import './app.css'

const routerJSX = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" render={(routeProps) => <IndexPage {...routeProps} />} />
            <Route exact path="/login" render={(routeProps) => <LoginPage {...routeProps} />} />
        </Switch>
    </HashRouter>
)

export default hot(module)(routerJSX)