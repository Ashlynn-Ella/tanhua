import React, { useContext, useState } from 'react'

const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    // mobile:'15915912345',
    mobile: '',
    // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsIm5hbWUiOiIxNTkxNTkxMjM0NSIsImlhdCI6MTYyNTMwMDYzMCwiZXhwIjoxNjUxMjIwNjMwfQ.xHWD3-wbch5Z9RZFFU3IGim2-txDngwLNJ0wQPev9kE',
    token:'',
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYxMCwibmFtZSI6IjE4OTE1NTA2ODIyIiwiaWF0IjoxNjI2ODU4MTUwLCJleHAiOjE2NTI3NzgxNTB9.rm0hjjM-YOBb9prJMpba_oFgGIBWCov3iJykIzzleto',
    // userId:'159159123451591501526289'
    userId: ''
  })
  return <AuthContext.Provider children={children} value={{ ...user, setUser }} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context
}
