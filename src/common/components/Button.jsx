import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./Button.styl"

const propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.node]),
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool
}

class Button extends Component {
    onButtonClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.props.onClick && this.props.onClick()
    }
    render() {
        const { disabled, className } = this.props
        return (
            <a href="javascript:" onClick={this.onButtonClick} 
                className={"standard-btn " + className + (disabled ? " disabled" : "")}
                style={{ ...this.props.style }}>
                {this.props.children}
            </a>
        )
    }
}

Button.defaultProps = {
    onClick: () => { }
}

Button.propTypes = propTypes


export default Button
