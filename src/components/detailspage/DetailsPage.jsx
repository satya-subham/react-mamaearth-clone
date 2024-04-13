import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { MainContext } from "../../context/Context";
import Cart from "../cart/Cart";
import "./DetailsPage.css";

export default function DetailsPage({ interval = 3000 }) {
  const { isCart, setIsCart, user } = useContext(MainContext);

  const loaderData = useLoaderData();

  const [src, setSrc] = useState(loaderData.product.images[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://images.ctfassets.net/66mrrren2unf/5p5pVTewrOIcFmKeO0vbEP/e5231799d3125147c283a13ca28caec7/3.jpg?q=40",
    "https://images.ctfassets.net/66mrrren2unf/3IvRaMW6skkw0p2QcDY1ry/6821685a57d78c28edfa4ae1f42e2640/Website.jpg?q=40",
    "https://images.ctfassets.net/66mrrren2unf/6n1lcbcBeLzdN4gLLkVYL1/af6375c19d1e873c71c725c7a2112fb6/multani_3.jpg?q=40",
    "https://images.ctfassets.net/66mrrren2unf/4rLBTAOcyFXeGSrMOzn3te/9b7405c8b8465573ac6ba6b131e365c8/onion_2.jpg?q=40",
    "https://images.ctfassets.net/66mrrren2unf/4k3rC2wPiva95hkzgHDwZ5/b12e4d667bd7ecfef4c1eb7fc979bc4b/Artboard_1__10_.jpg?q=40",
    "https://images.ctfassets.net/66mrrren2unf/7E0O8BZOwrpUgHjNopkk5E/6b7864545a56dcdd5660c06824bd1419/Artboard_1.jpg?q=40",
    "https://images.ctfassets.net/66mrrren2unf/6QikSWMwBOhrxanSgvFCjl/f0ea2ebd469ab3aa0cf2a5ea3fc30ef8/Desktop.jpg?q=40",
    "https://images.ctfassets.net/66mrrren2unf/6hO4nfD3zudJXPMkQNKXFV/84029953b39d504a4fdfd9475fe69393/web.jpg?q=40",
  ];

  const goToNextSlide = () => {
    const index = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentImageIndex, interval]);

  const handleImage = (e) => {
    setSrc(e.target.src);
  };

  const handleAddToCart = async (product) => {
    const body = {
      email: user.email,
      product: product,
    };

    try {
      const user = await fetch("http://localhost:8000/api/v1/users/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isCart ? <Cart /> : undefined}
      <div className="banner">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
        />
      </div>
      <div className="details-page-container">
        <div className="big-img-sml-img-container">
          <div className="big-img-container">
            <img src={src} alt="" srcset="" />
          </div>
          {loaderData.product.images.map((image, i) => (
            <div className="sml-img-container">
              <img src={image} alt="" srcset="" onClick={handleImage} />
            </div>
          ))}
        </div>
        <div className="product-details-container">
          <p>{loaderData.product.name}</p>
          <p>{loaderData.product.title}</p>
          <span>Rating: {loaderData.product.rating}</span> |{" "}
          <span>Reviews: {loaderData.product.reviews}</span>
          <p>Rs: {loaderData.product.price}</p>
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(loaderData.product)}
          >
            add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.id;
  const response = await fetch(
    `http://localhost:8000/api/v1/allproducts/${id}`
  );
  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch events",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
