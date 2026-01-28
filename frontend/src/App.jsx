import React, { useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Nav from './components/Nav'
import Collection from './pages/Collection'
import About from './pages/About'
import Product from './pages/Product'
import Contact from './pages/Contact'
import { UserDataContext } from './context/UserDataContext'
import ProductDetail from './pages/ProductDetail'
import Cart from './components/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Notfound from './pages/Notfound'
import Ai from './components/Ai'

function App() {
  const { userData } = useContext(UserDataContext)

  const location = useLocation()
  console.log("userData in App:", userData)


  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        toastClassName="relative z-[999999]"
        bodyClassName="relative z-[999999]"
        className="z-[999999]"
      />
      {userData && <Nav />}
      <Routes>
        <Route
          path='/login'
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/signup'
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        <Route
          path='/'
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/collection'
          element={
            userData ? (
              <Collection />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/about'
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/product'
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/contact'
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/productdetail/:productId'
          element={
            userData ? (
              <ProductDetail />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/cart'
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/placeorder'
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/order'
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route path='*' element={<Notfound/>} />
      </Routes>
      <Ai/>
    </>
  )
}

export default App
