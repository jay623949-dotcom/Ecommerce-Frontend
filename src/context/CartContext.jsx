import { createContext, useContext, useState } from "react";
import api from "../interceptors/axiosConfig";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await api.get("/Cart/getall");

      const count = res.data.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(count);
    } catch (err) {
      console.log("Cart count error", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        fetchCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);