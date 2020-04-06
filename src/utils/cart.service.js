export const getCart = () => {
  if (typeof window !== "undefined") {
    console.log("window ni underfined")
    console.log(window)

    return JSON.parse(window.localStorage.getItem("cart"))
  } else {
    return []
  }
}
export const updateCart = updatedCart => {
  if (typeof window !== "undefined") {
    console.log(window)
    window.localStorage.setItem("cart", JSON.stringify(updatedCart))
  }
}
