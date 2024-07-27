import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";

export default function HoverMiniLogIn() {
  const {
    hoverMiniLogInPopUp,
    setHoverMiniLogInPopUp,
    isRegister,
    setIsRegister,
    user,
    setUser,
    registerModal, 
    setRegisterModal
  } = useContext(MainContext);

  const onMouseEnter = () => {
    setHoverMiniLogInPopUp(true);
  };
  const onMouseOut = () => {
    setHoverMiniLogInPopUp(false);
  };

  const handleRegisterModal = () => {
    setIsRegister((prev) => !prev);
    setRegisterModal((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const handleLogOut = () => {
    axios
      .get("https://mamarath-backend.vercel.app/api/v1/users/loggedInUser/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="mini-log-in-pop-up"
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseOut}
    >
      <div className="navlink-div">
        <NavLink to={"/profile"}>
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
      {user ? (
        <button className="login-button" onClick={handleLogOut}>
          LogOut
        </button>
      ) : (
        <button className="login-button" onClick={handleRegisterModal}>
          LogIn
        </button>
      )}
    </div>
  );
}
