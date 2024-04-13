import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/Context";
import axios from "axios";

import "./Cart.css";

export default function Cart() {
  const { isCart, setIsCart, user, setUser } = useContext(MainContext);
  const [cartArr, setCartArr] = useState([]);

  const handleCloseModal = () => {
    setIsCart((prev) => !prev);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/loggedInUser", {
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
        `http://localhost:8000/api/v1/users/cart/${body.email}`,
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

  return (
    <>
      <div className="cart-container">
        <div className="cart-product-container">
          <div className="cart-header">
            <button onClick={handleCloseModal} className="left-arrow">
              <FontAwesomeIcon icon={faArrowLeft} className="faArrowLeft" />
            </button>
          </div>
          {cartArr.length === 0 ? (
            <h1>Your cart is empty !</h1>
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
