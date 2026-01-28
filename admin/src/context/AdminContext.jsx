import React, { useContext, useState, useEffect } from "react";
import { AuthDataContext } from "./AuthDataContext.js";
import axios from "axios";
import {AdminDataContext} from './AdminDataContext.js'
function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const {serverUrl} = useContext(AuthDataContext);
  console.log("server: ", serverUrl)

  const getCurrAdmin = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/user/getCurrAdmin', {
        withCredentials: true,
      });
      console.log("Admin data:", result.data);
      setAdminData(result.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setAdminData(null);
    }
  };

  useEffect(() => {
    getCurrAdmin();
  }, []);

  const value = {
    getCurrAdmin,
    adminData,
    setAdminData,
  }

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  )
}

export default AdminContext;
