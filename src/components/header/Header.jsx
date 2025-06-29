import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
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
    sideNav, 
    setSideNav
  } = useContext(MainContext);

  const { totalQuantity, name, email } = useSelector((state) => state.cart);
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
      <header className="sticky top-0 z-3">
        <div className="header xl:w-[100%] xl:h-auto lg:w-[100%] lg:h-auto md:w-[100%] md:h-auto sm:w-[100%] sm:h-auto max-sm:w-[100%] max-sm:h-auto bg-white shadow-[1px_2px_5px_0px_rgba(0,0,0,0.75)] animate-[background_2s_forwards_linear]">
          <div className="flex items-center justify-center border-b-[rgba(0,128,0,0.388)] border-b-[1px] max-[460px]:h-[40px]">
            <div className="logo-input xl:w-[60%] xl:h-auto lg:w-[60%] lg:h-auto md:w-[60%] md:h-auto sm:w-[60%] sm:h-auto max-sm:w-[100%] max-sm:h-[8vh] flex items-center max-[460px]:hidden">
              <img
                src="https://images.mamaearth.in/wysiwyg/mamaearth-logo.png?auto=format&fit=scale"
                alt="logo"
                className="xl:w-[20%] lg:w-[20%] md:w-[20%] sm:w-[20%] max-sm:w-[20%] cursor-pointer"
              />
              <input
                type="text"
                value={search}
                name="search"
                id="search"
                onChange={handleSearch}
                placeholder="Search your products here..."
                className="xl:w-[60%] xl:h-[30px] lg:w-[60%] lg:h-[25px] md:w-[60%] md:h-[25px] sm:w-[60%] sm:h-[25px] max-sm:w-[60%] max-sm:h-[25px] text-blue-600 xl:p-1 border-blue-600 ring-1 ring-blue-500 rounded-[5px] focus:border-blue-600 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <button className="xl:w-[8%] xl:h-[31px] lg:w-[9%] lg:h-[26px] md:w-[12%] md:h-[26px] sm:w-[14%] sm:h-[26px] max-sm:w-[15%] max-sm:h-[26px] bg-blue-600 text-white border-none rounded-r-sm cursor-pointer">
                Search
              </button>
            </div>


            {/* BAR MENU */}
            <div className="bar xl:hidden lg:hidden md:hidden sm:hidden max-[460px]:w-[50%] max-[460px]:h-[40px] flex items-center">
              <button>
                <FontAwesomeIcon icon={faBars} style={{color: "#B197FC",}} onClick={() => setSideNav(true)} />
              </button>
            </div>
            


            <div className="flex items-center justify-around xl:w-[40%] xl:h-auto lg:w-[40%] lg:h-auto md:w-[40%] md:h-auto sm:w-[40%] sm:h-auto max-sm:w-[40%] max-sm:h-auto">
              <img
                src="https://images.mamaearth.in/vip-desktop-join.gif"
                alt=""
                className="xl:w-[35%] xl:h-[8vh] lg:w-[35%] lg:h-[8vh] md:w-[35%] md:h-[8vh] sm:w-[35%] sm:h-[8vh] max-sm:w-[35%] max-sm:h-[8vh] max-sm:hidden cursor-pointer"
              />
              <button
                className="bg-none border-none text-blue-600 max-sm:text-[12px] cursor-pointer"
                onClick={handleCartModal}
              >
                <FontAwesomeIcon icon={faCartArrowDown} />
                Cart
                {totalQuantity}
              </button>
              {name ? (
                <button className="text-blue-600" onMouseOver={onMouseEnter} onMouseOut={onMouseOut}>
                  <FontAwesomeIcon icon={faUser} />
                  {name}
                </button>
              ) : (
                <button
                  className="bg-none border-none text-blue-600 max-sm:text-[12px] cursor-pointer"
                  onMouseOver={onMouseEnter}
                  onMouseOut={onMouseOut}
                >
                  <FontAwesomeIcon icon={faUser} />
                  Login
                </button>
              )}
            </div>
          </div>
          <nav>
            <div className="nav xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[100%] max-[460px]:hidden">
              <ul>
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.to}
                    className="link text-decoration-none text-xs sm:text-[11px] max-sm:text-[8px] text-[rgba(0,128,0,0.666)] cursor-pointer hover:text-blue-600"
                  >
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
