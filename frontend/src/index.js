//import từ thư viện bên ngoài
import React from 'react'
import ReactDOM from 'react-dom/client'

//import từ bên trong src
import App from './App'
import GlobalStyles from "~/components/GlobalStyles"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  // </React.StrictMode>
)
