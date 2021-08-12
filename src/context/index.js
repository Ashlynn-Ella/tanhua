import { AuthProvider } from './user-context'
import { UserProvider } from './my-context'
import React from 'react'
// import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from '../store'

export const Providers = ({ children }) => {
  // const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </AuthProvider>
    </Provider>
  )
}