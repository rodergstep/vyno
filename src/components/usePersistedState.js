import React from "react"

export default function usePersistedState(key, defaultValue) {
  if (typeof window !== "undefined") {
    console.log("window ni underfined")
    console.log(window)
    const [state, setState] = React.useState(() => {
      const persistedState = localStorage.getItem(key)
      return persistedState ? JSON.parse(persistedState) : defaultValue
    })
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
    }, [state, key])
    return [state, setState]
  } else {
    return ["state", () => console.log("setState")]
  }
}
