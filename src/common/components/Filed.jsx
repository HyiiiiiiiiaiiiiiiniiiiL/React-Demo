//cSpell:word guanbi
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./Filed.styl"

class Filed extends Component {
    constructor(props) {
        super(props)
        const value = props.value || ""
        this.state = {
            counter: value.length
        }
    }

    static defaultProps = {
        type: "input",
        name: "name",
        value: "",
        disabled: false,
        placeholder: ""
    }

    onChange(e) {
        e.stopPropagation()
        e.preventDefault()
        const { onChange } = this.props
        onChange && onChange(e)
        const value = e.target.value
        this.setState({ counter: value.length })
    }

    onBlur() {
        const { onInputFocus, onBlur } = this.props
        onInputFocus && onInputFocus(false)
        onBlur && onBlur()
    }

    onKeyDown(e) {
        const { onEnter } = this.props
        if (e.keyCode == 13) return onEnter && onEnter()
    }

    filedTypeRender() {
        const { type, name, value, className, onInputFocus, total,
            disabled, placeholder, security, error } = this.props
        const style = total ? { paddingRight: "36px" } : {}
        if (type === "input") {
            return <input className={className + (error ? " error-input" : "")}
                onFocus={() => onInputFocus && onInputFocus(true)}
                onBlur={this.onBlur.bind(this)} name={name} value={value}
                placeholder={placeholder} onKeyDown={this.onKeyDown.bind(this)} style={style}
                onChange={this.onChange.bind(this)} type={security ? "password" : "text"}
                disabled={disabled ? true : false} />
        } else if (type === "textarea") {
            return <textarea className={className + (error ? " error-input" : "")}
                onBlur={this.onBlur.bind(this)} name={name} value={value}
                placeholder={placeholder} style={{ resize: "none" }}
                onChange={this.onChange.bind(this)} disabled={disabled ? true : false} />
        } else {
            return null
        }
    }

    onRemove = () => {
        const { name, onRemove } = this.props
        onRemove && onRemove(name)
    }

    render() {
        const { error, total, onRemove, fieldClassName } = this.props
        const { counter } = this.state
        const num = total && total - counter || 0
        return (
            <div className={"standard-field" + (fieldClassName ? " " + fieldClassName : "")}>
                {this.filedTypeRender()}
                {onRemove && <i className="iconfont icon-guanbi remove-row" onClick={this.onRemove} />}
                {total ? <div className={"letter-counter" + (error ? " error-both " : "") +
                    (num >= 0 ? " positive" : " negative")}>{num}</div> : null}
            </div>
        )
    }
}


Filed.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    security: PropTypes.bool,
    onInputFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onEnter: PropTypes.func,
    onRemove: PropTypes.func,
    error: PropTypes.string,
    total: PropTypes.number,
    fieldClassName: PropTypes.string
}

export default Filed