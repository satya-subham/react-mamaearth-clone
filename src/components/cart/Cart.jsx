import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/Context";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "./Cart.css";
import { fetchCart, removeProductFromCart } from "../../store/cart-slice";

export default function Cart() {
  const { isCart, setIsCart, user, setUser, yes, setYes } =
    useContext(MainContext);
  // const [cartArr, setCartArr] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { msg, name, email } = useSelector((state) => state.cart);

  const handleCloseModal = () => {
    setYes((prev) => !prev);
    setTimeout(() => {
      setIsCart((prev) => !prev);
      setYes((prev) => !prev);
    }, 1000);
    dispatch(fetchCart());
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveCart = (id) => {
    console.log("remove product from cart step 1");
    const body = {
      email: email,
      id: id,
    };
    dispatch(removeProductFromCart(body));
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShop = () => {
    navigate("/allproducts");
    setIsCart((prev) => !prev);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <ToastContainer />
      <div className="w-[100%] h-[100%] bg-[#000000A3] fixed top-0 left-0 z-5">
        <div
          className={
            yes
              ? "xl:w-[30%] xl:h-[100%] bg-white absolute top-0 right-0 animate-[remove-cart_1s_linear] flex flex-col justify-between lg:w-[40%] lg:h-[100%] md:w-[50%] md:h-[100%] sm:w-[60%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%]"
              : "xl:w-[30%] xl:h-[100%] bg-white absolute top-0 right-0 animate-[banner_1s_linear] flex flex-col justify-between lg:w-[40%] lg:h-[100%] md:w-[50%] md:h-[100%] sm:w-[60%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%]"
          }
        >
          <div className="z-[100] xl:h-[50px] lg:h-[40px] md:h-[40px] sm:h-[40px] max-sm:h-[40px] shadow-[1px_2px_5px_0px_#000000BF]">
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
          {cartData.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="https://images.mamaearth.in/wysiwyg/bags2x.png?format=auto&fit=scale"
                alt="Image"
                width="200px"
                height="200px"
              />
              <h2>Your cart is empty !</h2>
              <button
                style={{
                  backgroundColor: "blueviolet",
                  color: "white",
                  padding: "5px 15px",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
                onClick={handleShop}
              >
                shop now
              </button>
            </div>
          ) : (
            <div className="xl:w-[100%] xl:h-[85%] overflow-y-auto overflow-x-hidden">
              {cartData?.map((item, index) => (
                <div
                  className="xl:h-[120px] xl:w-[100%] flex items-center justify-evenly border-b m-2.5 lg:h-[150px] lg:w-[100%] md:h-[150px] sm:w-[100%] sm:h-[150px] md:w-[100%] max-sm:h-[150px] max-sm:w-[100%]"
                  id="cont${item.id}"
                  key={index}
                >
                  <div>
                    <img
                      src={item.images[0]}
                      alt="mamaearth"
                      className="xl:w-[100px] xl:h-[100px] lg:w-[100px] lg:h-[100px] md:w-[100px] md:h-[100px] sm:w-[100px] sm:h-[100px] max-sm:w-[100px] max-sm:h-[100px]"
                    />
                  </div>
                  <div class="xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[50%] max-sm:w-[50%]">
                    <p className="xl:text-[15px] xl:text-[rgb(144_104_182)] lg:text-[15px] lg:text-[rgb(144_104_182)] md:text-[15px] md:text-[rgb(144_104_182)] sm:text-[15px] sm:text-[rgb(144_104_182)] max-sm:text-[15px] max-sm:text-[rgb(144_104_182)]">
                      {item.name}
                    </p>
                    <p className="text-blue-300"> Rs.{item.price}</p>
                  </div>
                  <div>
                    <button
                      className="xl:w-[60px] xl:h-[30px] bg-blue-700 text-white rounded-sm border-none cursor-pointer font-bold italic lg:w-[60px] lg:h-[30px] md:w-[60px] md:h-[30px] sm:w-[60px] sm:h-[30px] max-sm:w-[60px] max-sm:h-[30px]"
                      onClick={() => handleRemoveCart(item._id)}
                    >
                      Drop
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="bg-blue-700 text-white flex justify-center items-center p-4 h-[5vh] sticky bottom-0">
            <button>
              Total : {cartData.length} Buy Rs.{totalAmount}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
