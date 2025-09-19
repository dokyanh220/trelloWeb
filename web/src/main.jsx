// Cấu hình mặc định reactjs
import React from 'react'
import App from '~/App.jsx'
// Cấu hinh react-dom
import ReactDOM from 'react-dom/client'
// Cấu hinh react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router'
// Cấu hình MUI
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
// Cấu hình react-toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Flip } from 'react-toastify'
// Cấu hình dialog
import { ConfirmProvider } from 'material-ui-confirm'
// Cấu hình redux-store
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Provider store={store}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider>
            <CssBaseline />
            <ToastContainer
              position="bottom-right"
              theme="colored"
              closeOnClick
              draggable
              transition={Flip}
            />
            <App />
          </ConfirmProvider>
        </CssVarsProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
