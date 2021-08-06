import { AuthProvider } from './user-context'
import { UserProvider } from './my-context'
import React from 'react'
// import { QueryClient, QueryClientProvider } from 'react-query'

export const Providers = ({ children }) => {
  // const queryClient = new QueryClient()
  return (
    <AuthProvider>
      <UserProvider>
          {children}
      </UserProvider>
    </AuthProvider>
  )
}