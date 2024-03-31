import React, { useContext, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { MainContext } from "../../context/Context";
import HoverMiniLogIn from "../login/HoverMiniLogIn";

export default function Header({ search, setSearch }) {
  const { isCart, setIsCart, hoverMiniLogInPopUp, setHoverMiniLogInPopUp } =
    useContext(MainContext);

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
      name: "ALL PRODUCTS",
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
      to: "/storelocator",
      name: "STORE LOCATOR",
    },
  ];

  let storageData = [];
  if (localStorage.getItem("user")) {
    storageData = JSON.parse(localStorage.getItem("user"));
  }
  
  useEffect(()=>{
    async function getUser(){
      const token = {
        token: storageData[0]?.token
      };
      try {
        const user = await fetch("http://localhost:8000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token)
      });
      console.log(await user?.json());
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser()
  },[]);

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
              </button>
              { storageData.length > 0 ? <button onMouseOver={onMouseEnter} onMouseOut={onMouseOut}>
                <FontAwesomeIcon icon={faUser} />
                {storageData[0].data.firstName}
              </button> : <button onMouseOver={onMouseEnter} onMouseOut={onMouseOut}>
                <FontAwesomeIcon icon={faUser} />
                Login
              </button>}
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
