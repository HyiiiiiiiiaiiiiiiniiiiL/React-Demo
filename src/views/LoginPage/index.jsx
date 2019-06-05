//cSpell:word srctop
import React, { Component } from 'react'
import Button from "../../common/components/Button"
import Field from "../../common/components/Filed"
import PropTypes from "prop-types"
import "./index.styl"
const src = require("../../resources/login_left_image.png")
const srctop = require("../../resources/login_rocket.png")

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPasswordLogin: false,
            isCodeLogin: false,
            isSign: false,
            showChangeAndResendButtons: false,
            haveSendCode: false,
            codeRight: false
        }
    }

    renderLogin = () => {
        return <div className="login-render">
            <div className="login-title">验证码登录</div>
            <Field type="input" className="phone-email-input" placeholder="手机号/邮箱地址" />
            <Field type="input" fieldClassName="veri-input" className="verify-input" placeholder="验证码" />
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
    renderSecondTitle = () => {

    }
    renderResetOrSign() {
        const { showChangeAndResendButtons, isSign, haveSendCode, codeRight } = this.state
        return <div className="sign-reset">
            <div className="second-title">
                <span>请输入您的手机号或邮箱地址作为您的账号</span>
                <span>我们发送了一条短信/邮件到您的手机号/邮箱地址</span>
                <span>请设置您的密码</span>
            </div>
            <div className="third-title">
                <span>请输入短信/邮件中的<strong>6位验证码</strong></span>
            </div>
            <Field type="input" className="phone-email-input" placeholder="手机号/邮箱地址" />
            <Button>发送验证码</Button>
            {
                showChangeAndResendButtons ?
                    <React.Fragment><Button>更改我的手机号/邮箱</Button> <Button>重新发送验证码</Button></React.Fragment>
                    : <Button>已有账号,去登录></Button>
            }
        </div>
    }
    renderTitle() {
        const { isPasswordLogin, isCodeLogin, isSign } = this.state
        return <div className="login-title">
            <div className="login-title">
                {
                    isPasswordLogin ? "登录" : isCodeLogin ? "验证码登录" : isSign ? "注册" : "重置密码"
                }
            </div>
        </div>
    }
    renderContent() {

    }
    renderButton() {

    }
    render() {
        return <div className="login-page">
            <div className="login-container">
                <div className="container">
                    <div className="content-left">
                        <img src={src} className="login-left-image" />
                    </div>
                    <div className="content-right">
                        {this.renderLogin()}
                    </div>
                    <div className="content-right-top">
                        <img className="rocket" src={srctop} />
                    </div>
                </div>
            </div>
        </div>
    }
}

LoginPage.propTypes = {

}