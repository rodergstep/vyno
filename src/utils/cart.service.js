export const getCart = () => {
  if (typeof window !== "undefined") {
    console.log("window ni underfined")
    return JSON.parse(window.localStorage.getItem("cart"))
  } else {
    return []
  }
}
export const updateCart = updatedCart => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("cart", JSON.stringify(updatedCart))
  }
}
