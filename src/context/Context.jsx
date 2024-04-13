import React, { createContext, useState } from "react";

const MainContext = createContext();

function Context({ children }) {
  const [isCart, setIsCart] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [hoverMiniLogInPopUp, setHoverMiniLogInPopUp] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();

  return (
    <MainContext.Provider
      value={{
        isCart,
        setIsCart,
        hoverMiniLogInPopUp,
        setHoverMiniLogInPopUp,
        isRegister,
        setIsRegister,
        search,
        setSearch,
        user,
        setUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export { MainContext, Context };
