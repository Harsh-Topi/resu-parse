import React from 'react'
import { render } from 'react-dom'
import "bootstrap/dist/css/bootstrap.css";
import { GlobalStyle } from './styles/GlobalStyle'

import Greetings from './components/Greetings'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Greetings />
    </>
  )
}

render(<App />, mainElement)
