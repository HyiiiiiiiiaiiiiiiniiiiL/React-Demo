import React, { Component } from 'react'
import LoginPage from '../LoginPage'
import "./index.styl"

export default class IndexPage extends Component {
    render() {
        return <div className="index-page">赛辅首页
                    <LoginPage />
        </div>
    }
}