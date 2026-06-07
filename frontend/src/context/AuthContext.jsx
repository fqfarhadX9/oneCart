import React from 'react'
import { AuthDataContext} from './AuthDataContext'

// export const AuthDataContext = createContext()
function AuthContext({children}) {
    const apiUrl = import.meta.env.VITE_API_URL
    const value = {
         apiUrl
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