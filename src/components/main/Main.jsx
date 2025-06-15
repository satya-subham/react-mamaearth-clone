import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "react-spinners/RingLoader";
import { MainContext } from "../../context/Context";
import Cart from "../cart/Cart";
import HoverMiniLogIn from "../login/HoverMiniLogIn";
import RegisterForm from "../registerform/RegisterForm";
import { ToastContainer, toast } from "react-toastify";

import "./Main.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Main({ interval = 3000 }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const { msg, name, email } = useSelector((state) => state.cart);

  const {
    isCart,
    setIsCart,
    hoverMiniLogInPopUp,
    setHoverMiniLogInPopUp,
    isRegister,
    setIsRegister,
    search,
    setSearch,
  } = useContext(MainContext);

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

  useEffect(() => {
    if (currentImageIndex === images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setTimeout(() => setCurrentImageIndex(currentImageIndex + 1), 3000);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    axios
      .get("https://mamarath-backend.vercel.app/api/v1/home")
      .then((response) => {
        setProducts([...response.data["products"]]);
        setFilteredProduct([...response.data["products"]]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    let filteredProducts = products.filter((product) => {
      if (product.name) {
        return product.name.toLowerCase().includes(search.toLowerCase());
      }
    });
    // setProducts(filteredProducts)
    setFilteredProduct(filteredProducts);
  }, [search]);

  const handleAddToCart = async (product) => {
    if (!name) {
      return alert("please log in to add to cart");
    }
    const body = {
      email: email,
      product: product,
    };

    try {
      const user = await fetch(
        "https://mamarath-backend.vercel.app/api/v1/users/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error.message);
    }

    toast.success("Product Added Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <main>
        <ToastContainer />
        {isCart ? <Cart /> : undefined}

        {isRegister ? <RegisterForm /> : undefined}

        <section className="banner">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
          />
        </section>

        {loading ? (
          <div className="loader-div">
            <RingLoader
              className="loader"
              color={"#F37A24"}
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="main-container">
            {filteredProduct.map((product, index) => (
              <div className="item-container" key={index}>
                <div className="best-seller">Best Seller</div>
                <Link to={`/product/${product._id}`}>
                  <img src={product.images[0]} alt="" id="home_img" />
                </Link>
                <p className="item-para">{product.name}</p>
                <p className="para" style={{ fontSize: "small" }}>
                  {product.title}
                </p>
                <p className="para">
                  <FontAwesomeIcon icon={faStar} className="fa-star" />
                  {product.rating} <span> | {product.reviews} reviews</span>
                </p>
                <p className="item-price">Rs: {product.price}</p>
                <button
                  id="cart"
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        )}

        <section>
          <div className="video-section-text">
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YROZybuYGUE"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="text">
              <h2>Our Goodness Promise</h2>
              <p>
                At Mamaearth, we live to spread a little love and goodness every
                day. We believe that goodness isn’t a superpower, nor a special
                gift, it’s inside all of us and it shows in the little choices
                we make. Our mission is to bring you the best of nature through
                our purest and most nurturing products that are made without any
                toxins or harmful chemicals. For us goodness also means being
                good to the earth. Which is why we recycle more plastic than we
                use and we're PETA Certified - which means we never test on
                animals. This is our #GoodnessInside.
              </p>
              <div>
                <button>SHOP NOW</button>
                <button>OUR PLEDGES</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
