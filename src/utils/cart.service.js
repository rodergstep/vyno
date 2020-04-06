export const getCart = () => typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem("cart")) : [];
export const updateCart = updatedCart =>
(typeof window !== 'undefined') && window.localStorage.setItem("cart", JSON.stringify(updatedCart))
