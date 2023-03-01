import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routing } from './app/routing'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  )
}

export default App
