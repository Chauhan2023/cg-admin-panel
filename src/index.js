import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'remixicon/fonts/remixicon.css'
import './index.css'
import App from './App'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
        <Toaster position='top-right' />
      </Router>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root'),
)
