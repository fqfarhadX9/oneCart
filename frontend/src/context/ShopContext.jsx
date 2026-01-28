import React, { useState, useEffect, useContext } from 'react';
import { AuthDataContext } from './AuthDataContext'
import { ShopDataContext } from './ShopDataContext.js'
import axios from 'axios';
import { UserDataContext } from './UserDataContext.js';


function ShopContext({ children }) {
    const [products, setProducts] = useState([])
    const { serverUrl } = useContext(AuthDataContext)
    const {userData} = useContext(UserDataContext)
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItem, setCartItem] = useState({})
    const currency = "₹"
    const delivery_fee = 40
    const getAllProducts = async () => {
        try {
            const result = await axios.get(serverUrl + '/api/product/list', { withCredentials: true })

            console.log(result.data);
            setProducts(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const addtoCart = async (itemId, size) => {
        if(!size) {
            console.log("Select product size")
            return 
        }
        let cartData = structuredClone(cartItem)
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);
        console.log("cart data:", cartData);

        if(userData) {
            try {
                const response = await axios.post(serverUrl + "/api/cart/addcart", 
                {itemId, size}, {withCredentials: true})
                console.log("Cart updated successfully:", response.data);
            } catch (error) {
                console.log("Error adding to cart:", error.response?.data || error.message);
            }
        }
    }
    const getUserCart = async() => {
        try {
            const result = await axios.get(serverUrl + "/api/cart/getcart", {withCredentials: true})
            setCartItem(result.data.data)
        } catch (error) {
            console.log("Error while get user cart:", error.result?.data || error.message);
        }
    }
    const updateQuantity = async ({itemId, size, quantity}) => {
         let cartData = structuredClone(cartItem)
         cartData[itemId][size] = quantity
         setCartItem(cartData)

         if(userData) {
            try {
            const result = await axios.post(serverUrl + "/api/cart/updatecart", 
            {itemId, size, quantity}, {withCredentials: true})
            setCartItem(result.data)
         } catch (error) {
            console.log(error);
         }
         }
    }
    const getCartAmount = () => {
        let totalAmount=0;
        for(const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items)
            for(const item in cartItem[items]) {
                try {
                    if(cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getCartCount = () => {
        let totalCount=0;
        for(const items in cartItem) {
            for(const item in cartItem[items]) {
                try {
                    if(cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    useEffect(() => {
        getAllProducts()
    }, [serverUrl])
    useEffect(() => {
        if(userData) {
            getUserCart()
        }
    }, [userData])

    const value = {
        products,
        currency,
        delivery_fee,
        getAllProducts,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addtoCart,
        cartItem,
        setCartItem,
        getCartCount,
        updateQuantity,
        getCartAmount
    };

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
}

export default ShopContext