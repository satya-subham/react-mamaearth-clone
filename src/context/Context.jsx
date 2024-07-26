import React, { createContext, useState } from "react";

const MainContext = createContext();

function Context({ children }) {
  const [isCart, setIsCart] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [hoverMiniLogInPopUp, setHoverMiniLogInPopUp] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const [yes, setYes] = useState(false);

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
        yes, 
        setYes
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export { MainContext, Context };
