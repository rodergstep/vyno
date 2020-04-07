import React from "react"
import usePersistedState from "./usePersistedState"

export const CartContext = React.createContext()
export const CartProvider = props => {
  const [cart, setCart] = usePersistedState("cart", [])
  const context = React.useMemo(() => ({ cart, setCart }), [cart, setCart])
  return (
    <CartContext.Provider value={context}>
      <div {...props} />
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error("useCart can't be used witout outside of a CartProvider")
  }
  const { cart, setCart } = context
  const cartApi = (paint, action) => {
    let updatedCart = [...cart]
    switch (action) {
      case "ADD":
        updatedCart.push(paint)
        break
      case "DELETE":
        updatedCart = updatedCart.filter(
          obj => obj.contentful_id !== paint.contentful_id
        )
        break
      case "RESET":
        updatedCart = []
        break
    }
    setCart(updatedCart)
    console.log(updatedCart)
  }
  return [cart, cartApi]
}
