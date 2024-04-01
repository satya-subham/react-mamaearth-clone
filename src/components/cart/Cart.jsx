import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/Context";
import "./Cart.css";
export default function Cart() {
  const { isCart, setIsCart } = useContext(MainContext);
  const [cartArr, setCartArr] = useState([])

  const handleCloseModal = () => {
    setIsCart((prev) => !prev);
    document.body.style.overflow = "auto";
  };

  let storageData = [];
  if (localStorage.getItem("user")) {
    storageData = JSON.parse(localStorage.getItem("user"));
  }
  
  useEffect(()=>{
    async function getUser(){
      const email = storageData[0].data.email;
      try {
        const user = await fetch(`http://localhost:8000/api/v1/users/cart/${email}`);
        const data = await user.json();
        console.log(data);
        setCartArr(data.cart)
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser()
  },[]);

  
  const handleRemoveCart = async (id)=>{
    const body = {
      email: storageData[0].data.email,
      id: id
    }

    try {
      const user = await fetch(`http://localhost:8000/api/v1/users/cart/${body.email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.log(error.message);
    }
     
  }

  return (
    <>
      <div className="cart-container">
        <div className="cart-product-container">
          <div className="cart-header">
            <button onClick={handleCloseModal} className="left-arrow">
              <FontAwesomeIcon icon={faArrowLeft} className="faArrowLeft" />
            </button>
          </div>
          <div className="cart_content3 ">
            {
              cartArr.map((item, index) => (
                
                <div className="cart_data" id="cont${item.id}" key={index}>
                  <div><img src={item.images[0]} alt="mamaearth" className="cart_image_name"/></div>
                  <div class="cart-img-text"><p className="image_name" >${item.name}</p>
                  <p className="price_name" > Rs.${item.price}</p></div>
                   <div><button className="deletebutton" onClick={()=>handleRemoveCart(item._id)}>Drop</button></div>
                   </div>
                
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}
