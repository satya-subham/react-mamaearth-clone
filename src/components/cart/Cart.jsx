import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/Context";
import axios from "axios";
import AllProducts from "../allproducts/AllProducts";

import "./Cart.css";

export default function Cart() {
  const { isCart, setIsCart, user, setUser, yes, setYes } = useContext(MainContext);
  const [cartArr, setCartArr] = useState([]);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setYes((prev)=>!prev)
    setTimeout(()=>{
      setIsCart((prev) => !prev);
      setYes((prev)=>!prev)
    }, 1000)
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    axios
      .get("https://mamarath-backend.vercel.app/api/v1/users/loggedInUser", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        // setUser(response.data)
        setCartArr(response.data.cart);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemoveCart = async (id) => {
    for (let i = 0; i < cartArr.length; i++) {
      const element = cartArr[i];
      if (element._id === id) {
        cartArr.splice(i, 1);
      }
    }

    const body = {
      email: user.email,
      id: id,
    };

    console.log(body);

    try {
      const user = await fetch(
        `https://mamarath-backend.vercel.app/api/v1/users/cart/${body.email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShop = () =>{
    navigate('/allproducts');
    setIsCart((prev) => !prev);
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <div className="cart-container">
        <div className={yes ? "remove-cart-product-container" : "cart-product-container"}>
          <div className="cart-header">
            <button onClick={handleCloseModal} className="left-arrow">
              <FontAwesomeIcon icon={faArrowLeft} className="faArrowLeft" />
            </button>
          </div>
          {cartArr.length === 0 ? (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <img src="https://images.mamaearth.in/wysiwyg/bags2x.png?format=auto&fit=scale" alt="" width="200px" height="200px"/>
              <h2>Your cart is empty !</h2>
              <button style={{backgroundColor: 'blueviolet', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '5px', marginTop: '10px'}} onClick={handleShop}>shop now</button>
            </div>
          ) : (
            <div className="cart_content3 ">
              {cartArr?.map((item, index) => (
                <div className="cart_data" id="cont${item.id}" key={index}>
                  <div>
                    <img
                      src={item.images[0]}
                      alt="mamaearth"
                      className="cart_image_name"
                    />
                  </div>
                  <div class="cart-img-text">
                    <p className="image_name">${item.name}</p>
                    <p className="price_name"> Rs.${item.price}</p>
                  </div>
                  <div>
                    <button
                      className="deletebutton"
                      onClick={() => handleRemoveCart(item._id)}
                    >
                      Drop
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
