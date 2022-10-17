import React from 'react'
import ReactDOM from 'react-dom/client'
import JournalApp from './JournalApp'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PokeApp from './PokeApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <JournalApp /> */}
      <PokeApp />
    </BrowserRouter>
  </React.StrictMode>
)
