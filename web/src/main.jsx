import App from '~/App.jsx'
// Cấu hinh react-dom
import ReactDOM from 'react-dom/client'
// Cấu hinh react-router-dom
import { BrowserRouter } from 'react-router'
// Cấu hình MUI
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
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
// Cấu hình redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Kỹ thuật Inject Store: kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
import { injectStore } from '~/utils/authorizeAxios'
injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
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
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)
