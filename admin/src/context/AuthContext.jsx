import React from 'react'
import { AuthDataContext } from './AuthDataContext'
function AuthContext({children}) {
    const serverUrl = "https://onecart-7q1f.onrender.com"
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