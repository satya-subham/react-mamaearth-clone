import React, { createContext, useState } from 'react'

const MainContext = createContext()

function Context({ children }) {
    const [isCart, setIsCart] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [hoverMiniLogInPopUp, setHoverMiniLogInPopUp] = useState(false)
  return (
    <MainContext.Provider value={{ isCart, setIsCart, hoverMiniLogInPopUp, setHoverMiniLogInPopUp, isRegister, setIsRegister}}>
        { children }
    </MainContext.Provider>
  )
}
export { MainContext, Context}