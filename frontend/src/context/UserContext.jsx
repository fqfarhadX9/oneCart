import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthDataContext } from './AuthDataContext.js';
import { UserDataContext } from './UserDataContext.js';

function UserContext({ children }) {
    const [userData, setUserData] = useState("");
    const { apiUrl } = useContext(AuthDataContext);

    const getCurrentUser = async () => {
        try {
            const result = await axios.get(apiUrl + '/api/user/getCurrentUser', { withCredentials: true })

            console.log(result.data);
            setUserData(result.data);
        } catch (error) {
            setUserData(null);
            console.log(error);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, [apiUrl]);

    const value = {
        userData,
        setUserData,
        getCurrentUser
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext;
