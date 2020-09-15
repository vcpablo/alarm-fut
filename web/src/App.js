import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './services/apollo'
import Routes from './routes'
import 'react-placeholder/lib/reactPlaceholder.css'
import './App.css'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
