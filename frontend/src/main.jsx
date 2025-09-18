import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster 
          position="top-center"
          containerStyle={{
            position: 'fixed',
            top: '20px',
            zIndex: 10000
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(17, 24, 39, 0.9))',
              color: '#fff',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.2)',
              fontSize: '14px',
              fontWeight: '500'
            },
            success: {
              style: {
                border: '1px solid rgba(34, 197, 94, 0.3)',
                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.2), 0 0 0 1px rgba(34, 197, 94, 0.2)'
              }
            },
            error: {
              style: {
                border: '1px solid rgba(239, 68, 68, 0.3)',
                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.2), 0 0 0 1px rgba(239, 68, 68, 0.2)'
              }
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
