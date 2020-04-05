export const getCart = () => typeof window !== 'undefined' && JSON.parse(localStorage.getItem("cart"))
export const updateCart = updatedCart =>
typeof window !== 'undefined' && localStorage.setItem("cart", JSON.stringify(updatedCart))
