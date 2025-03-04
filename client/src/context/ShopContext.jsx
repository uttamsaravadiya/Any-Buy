import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (id) => {
    if (token) {
      try {
        const response = await axios.post(
          `/api/cart/add/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartItems = async () => {
    try {
      const response = await axios.get("/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getCartItems(localStorage.getItem("token"));
    }
  });

  const value = {
    currency,
    search,
    setSearch,
    cartItems,
    setCartItems,
    products,
    setProducts,
    token,
    setToken,
    addToCart,
    getCartItems,
  };

  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};
