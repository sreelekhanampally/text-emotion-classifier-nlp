import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        theme="dark"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: 'rgba(21, 16, 42, 0.85)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            backdropFilter: 'blur(14px)',
            color: '#E9E4FF',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
