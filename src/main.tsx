import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ProductContextProvider from './productContext/ProductContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductContextProvider>
    <Router>
      <App />
    </Router>
  </ProductContextProvider>
)
