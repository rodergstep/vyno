import { useState, useMemo, useCallback } from "react"
import { updateCart, getCart } from "../utils/cart.service"

const Cart = () => {
  const [cart, setCart] = useState(getCart())
  const addToCart = useCallback(item =>
    setCart(prevCart => [...prevCart, item])
  )
  const removeFromCart = useCallback(item =>
    setCart(prevCart => prevCart.filter(obj => obj.id !== item.id))
  )
  const resetCart = useCallback(() => setCart([]), [])

  const viewCart = useCallback(() => cart)
  const getApi = useMemo(() => {
    updateCart(cart)
    console.log("cart current", getCart())
    return { addToCart, removeFromCart, resetCart, viewCart }
  }, [cart])
  return getApi
}

export default Cart
