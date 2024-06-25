import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "react-spinners/RingLoader";
import { MainContext } from "../../context/Context";
import Cart from "../cart/Cart";
import { Link } from "react-router-dom";

export default function Hair({ interval = 3000 }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isCart, setIsCart, search, setSearch, user } =
    useContext(MainContext);

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

  useEffect(() => {
    axios
      .get("https://mamarath-backend.vercel.app/api/v1/hair")
      .then((response) => {
        console.log(response);
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
    if (!user) {
      return alert("please log in to add to cart");
    }
    const body = {
      email: user.email,
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
              <p className="para">
                <FontAwesomeIcon icon={faStar} className="fa-star" />
                {(5 * parseInt(product.avg_rating_percent)) / 100}{" "}
                <span> | {product.review_count} reviews</span>
              </p>
              <p className="item-price">{product.price}</p>
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
    </>
  );
}
