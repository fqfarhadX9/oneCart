import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import List from './pages/List'
import Login from './pages/Login'
import { AdminDataContext } from './context/AdminDataContext'
import Order from './pages/Order'
 import { ToastContainer, toast } from 'react-toastify';

function App() {
  const {adminData} = useContext(AdminDataContext)
  return (
    <>
    <ToastContainer />
      {!adminData ? <Login/> : <>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/list' element={<List/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/Orders' element={<Order/>}/>
      </Routes>
      </>
      }
    </>
  )
}

export default App