import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthDataContext } from './AuthDataContext.js';
import { UserDataContext } from './UserDataContext.js';

function UserContext({ children }) {
    const [userData, setUserData] = useState("");
    const { serverUrl } = useContext(AuthDataContext);

    const getCurrentUser = async () => {
        try {
            const result = await axios.get(serverUrl + '/api/user/getCurrentUser', { withCredentials: true })

            console.log(result.data);
            setUserData(result.data);
        } catch (error) {
            setUserData(null);
            console.log(error);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

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
