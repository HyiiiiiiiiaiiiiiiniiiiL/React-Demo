//cSpell:word centerapp teacherapp
import React from 'react'
import { render } from 'react-dom'
import HotRouterJSX from './router'

const appEle = document.getElementById('app')

const app = () => render(<HotRouterJSX />, appEle)

app()
