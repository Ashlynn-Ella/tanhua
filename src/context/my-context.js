import React, { useContext, useState } from 'react'

const UserContext = React.createContext(undefined)
UserContext.displayName = 'UserContext'

export const UserProvider = ({ children }) => {
  const [my, setMy] = useState({})
  return <UserContext.Provider children={children} value={{ my, setMy }} />
}

export const useMy = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context
}
