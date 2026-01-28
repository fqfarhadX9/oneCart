import React from 'react'
import { AuthDataContext} from './AuthDataContext'

// export const AuthDataContext = createContext()
function AuthContext({children}) {
    const serverUrl = "http://localhost:8000"
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