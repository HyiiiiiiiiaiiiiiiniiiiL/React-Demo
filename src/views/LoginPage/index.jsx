import React, { Component } from 'react'
import Button from "../../common/components/Button"
import "./index.styl"
const src = require("../../resources/login_left_image.png")
const srctop = require("../../resources/login_plane.png")

export default class LoginPage extends Component {

    renderLogin() {
        return <div className="login-render">
            <div className="login-title">验证码登录</div>
            <input type="text" className="phone-email-input" placeholder="手机号/邮箱地址" />
            <input type="text" className="verify-input" placeholder="验证码" />
            <Button className="send-code-button">发送验证码</Button>
            <div className="chose-login">
                <div className="password-login">
                    <a href="">密码登录</a>
                </div>
                <div className="forget-password">
                    <a href="">忘记密码?</a>
                </div>
            </div>
            <Button className="login-button">登录</Button>
            <Button className="sign-button">没有账号?去注册></Button>
        </div>
    }
    renderSign() {
        return <div className="sign-render"></div>
    }
    renderReset() {
        return <div className="reset-render"></div>
    }
    render() {
        return <div className="login-page">
            <div className="content-left">
                <img src={src} className="login-left-image" />
            </div>
            <div className="content-right">
                {this.renderLogin()}
            </div>
            <div className="content-right-top">
                <img src={srctop} />
            </div>
        </div>
    }
}