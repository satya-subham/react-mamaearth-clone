import React, { useContext, useEffect } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { MainContext } from "../../context/Context";

export default function HoverMiniLogIn() {
  const {
    hoverMiniLogInPopUp,
    setHoverMiniLogInPopUp,
    isRegister,
    setIsRegister,
  } = useContext(MainContext);

  const onMouseEnter = () => {
    setHoverMiniLogInPopUp(true);
  };
  const onMouseOut = () => {
    setHoverMiniLogInPopUp(false);
  };

  const handleRegisterModal = () => {
    setIsRegister((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  let storageData = [];
  if (localStorage.getItem("user")) {
    storageData = JSON.parse(localStorage.getItem("user"));
  }

  const handleLogOut = () =>{
    localStorage.clear();
  }

  
  

  return (
    <div
      className="mini-log-in-pop-up"
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseOut}
    >
      <div className="navlink-div">
        <NavLink>
          <FontAwesomeIcon icon={faUser} />
          Your Profile
        </NavLink>
      </div>
      <div className="navlink-div">
        <NavLink>
          <FontAwesomeIcon icon={faCartArrowDown} />
          Your Order
        </NavLink>
      </div>
      <div className="navlink-div">
        <NavLink>
          <FontAwesomeIcon icon={faLocationDot} />
          Your Order
        </NavLink>
      </div>
      <div className="navlink-div">
        <NavLink>
          <FontAwesomeIcon icon={faPhone} />
          Your Order
        </NavLink>
      </div>
      {
        storageData.length > 0 ? <button className="login-button" onClick={handleLogOut}>
        LogOut
      </button> : <button className="login-button" onClick={handleRegisterModal}>
        LogIn
      </button>
      }
    </div>
  );
}
