import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { MainContext } from "../../context/Context";
import HoverMiniLogIn from "../login/HoverMiniLogIn";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/cart-slice";

export default function Header() {
  const {
    isCart,
    setIsCart,
    hoverMiniLogInPopUp,
    setHoverMiniLogInPopUp,
    search,
    setSearch,
    user,
    setUser,
  } = useContext(MainContext);

  const {totalQuantity, name, email} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCartModal = () => {
    setIsCart((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const onMouseEnter = () => {
    setHoverMiniLogInPopUp(true);
  };
  const onMouseOut = () => {
    setHoverMiniLogInPopUp(false);
  };

  const links = [
    {
      to: "/",
      name: "HOME",
    },
    {
      to: "/beauty",
      name: "BEAUTY",
    },
    {
      to: "/hair",
      name: "HAIR",
    },
    {
      to: "/face",
      name: "FACE",
    },
    {
      to: "/body",
      name: "BODY",
    },
    {
      to: "/makeup",
      name: "MAKEUP",
    },
    {
      to: "/ingredient",
      name: "INGREDIENT",
    },
    {
      to: "/baby",
      name: "BABY",
    },
    {
      to: "/giftpacks",
      name: "GIFTPACKS",
    },
    {
      to: "/allproducts",
      name: "ALLPRODUCTS",
    },
    {
      to: "/blog",
      name: "BLOG",
    },
    {
      to: "/plantgoodness",
      name: "PLANTGOODNESS",
    },
    {
      to: "/store",
      name: "STORE",
    },
  ];

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <>
      <header>
        <div className="header">
          <div className="logo-input-cart-login">
            <div className="logo-input">
              <img
                src="https://images.mamaearth.in/wysiwyg/mamaearth-logo.png?auto=format&fit=scale"
                alt="logo"
              />
              <input
                type="text"
                value={search}
                name="search"
                id="search"
                onChange={handleSearch}
                placeholder="Search your products here..."
              />
              <button>Search</button>
            </div>
            <div className="cart-login">
              <img
                src="https://images.mamaearth.in/vip-desktop-join.gif"
                alt=""
              />
              <button onClick={handleCartModal}>
                <FontAwesomeIcon icon={faCartArrowDown} />
                Cart
                {totalQuantity}
              </button>
              {name ? (
                <button onMouseOver={onMouseEnter} onMouseOut={onMouseOut}>
                  <FontAwesomeIcon icon={faUser} />
                  {name}
                </button>
              ) : (
                <button onMouseOver={onMouseEnter} onMouseOut={onMouseOut}>
                  <FontAwesomeIcon icon={faUser} />
                  Login
                </button>
              )}
            </div>
          </div>
          <nav>
            <div className="nav">
              <ul>
                {links.map((link, index) => (
                  <NavLink key={index} to={link.to} className="link">
                    {link.name}
                  </NavLink>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {hoverMiniLogInPopUp ? <HoverMiniLogIn /> : undefined}
    </>
  );
}
