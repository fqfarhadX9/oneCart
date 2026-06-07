import React from 'react'
import { AuthDataContext } from './AuthDataContext'
function AuthContext({children}) {
    const serverUrl = import.meta.env.VITE_SERVER_URL
    const value = {
        serverUrl
    }
  return (
    <div>
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext