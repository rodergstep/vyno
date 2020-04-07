import { useState, useMemo, useCallback } from "react"
import { updateCart, getCart } from "../utils/cart.service"

const cart = () => {
  const [cart, setCart] = useState(getCart())
  console.log(cart)
  console.log(setCart)
  const addToCart = useCallback(item =>
    setCart(prevCart => prevCart &&  [...prevCart, item])
  )
  const removeFromCart = useCallback(item =>
    setCart(prevCart => prevCart.filter(obj => obj.contentful_id !== item.contentful_id))
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

export default cart
