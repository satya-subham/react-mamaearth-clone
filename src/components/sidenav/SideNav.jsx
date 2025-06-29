import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/Context";
import { NavLink } from "react-router-dom";
// Ensure you have the correct path to your CSS file
export default function SideNav() {
  const { yes, setYes, sideNav, setSideNav } = useContext(MainContext);
  const handleCloseModal = () => {
    setYes((prev) => !prev);
    setTimeout(() => {
      setSideNav((prev) => !prev);
      setYes((prev) => !prev);
    }, 1000);
    document.body.style.overflow = "auto";
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
  return (
    <>
      <div className="w-[100%] h-[100%] bg-[#000000A3] fixed top-0 left-0 z-5">
        {" "}
        <div
          className={
            yes
              ? "xl:w-[30%] xl:h-[100%] bg-white absolute top-0 right-0 animate-[remove-cart_1s_linear] lg:w-[40%] lg:h-[100%] md:w-[50%] md:h-[100%] sm:w-[60%] sm:h-[100%] max-sm:w-[50%] max-sm:h-[100%]"
              : "xl:w-[30%] xl:h-[100%] bg-white absolute top-0 right-0 animate-[banner_1s_linear] lg:w-[40%] lg:h-[100%] md:w-[50%] md:h-[100%] sm:w-[60%] sm:h-[100%] max-sm:w-[50%] max-sm:h-[100%]"
          }
        >
          <div className="z-[100] xl:h-[50px] lg:h-[40px] md:h-[40px] sm:h-[40px] max-sm:h-[40px]">
            <button
              onClick={handleCloseModal}
              className="bg-none border-none cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-lg text-blue-400 mt-4 ml-3"
              />
            </button>
          </div>

          <div className="max-[460px]:w-[50%] max-[460px]:h-[100%]">
            <ul className="flex flex-col items-left">
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className="text-decoration-none text-blue-600 cursor-pointer hover:text-blue-600"
                >
                  {link.name}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
