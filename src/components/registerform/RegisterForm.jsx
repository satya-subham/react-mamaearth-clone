import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/Context";

import "./RegisterForm.css";

export default function () {
  const [loginModal, setLoginModal] = useState(false)
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const[logInDetails, setLogInDetails] = useState({
    email: "",
    password: "",
  })

  const handleSignUpDetails = (type, value) => {
    setSignUpDetails((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  const handleLogInDetails = (type, value) => {
    setLogInDetails((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  const { isRegister, setIsRegister } = useContext(MainContext);

  const handleCloseModal = () => {
    setIsRegister((prev) => !prev);
    document.body.style.overflow = "auto";
  };

  const handleLoginModal = () => {
    setLoginModal((prev) => !prev);
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      if(signUpDetails.password != signUpDetails.confirmPassword){
       return alert("confirmPassword must be matched with password");
      }

      const user = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetails)
      });

      console.log(user);
      const data = await user.json();
      if(data){
        alert(data.message)
      }
      console.log(data);

      setSignUpDetails({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        password: "",
        confirmPassword: "",
      })

      if(!user){
        throw new Error("Unable to register user");
      }
    } catch (error) {
      alert(error.message)
    }
    console.log(signUpDetails);
  };

  const handleLogIn = async (event) =>{
    event.preventDefault();
    try {
      const user = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInDetails)
      });

      const data = await user.json();
      let storageData = [];
      if(localStorage.getItem("user")){
        storageData = JSON.parse(localStorage.getItem("user"))
      }else{
        storageData.push(data)
        localStorage.setItem("user", JSON.stringify(storageData))
      }
      alert(data.message)
      console.log(data);

      setLogInDetails({
        email: "",
        password: "",
      });
    

    } catch (error) {
      alert(error.message)
    }

  }

  return (
    <>
      {
        loginModal ? (
          <div className="register-container">
        <div className="register-product-container">
          <div className="register-header">
            <button onClick={handleCloseModal} className="left-arrow">
              <FontAwesomeIcon icon={faArrowLeft} className="faArrowLeft" />
            </button>
            <h2>Log In here !</h2>
          </div>
          <div className="form-container">
            <form onSubmit={handleLogIn} >
              
              <label htmlFor="email">Email: </label> <br />
              <input
                type="email"
                name="email"
                id="email"
                value={logInDetails.email}
                onChange={(event)=>handleLogInDetails('email', event.target.value)}
                required
              />{" "}
              <br />
              
              <label htmlFor="password">Password: </label> <br />
              <input
                type="password"
                name="password"
                id="password"
                value={logInDetails.password}
                onChange={(event)=>handleLogInDetails('password', event.target.value)}
                required
              />{" "}
              <br />
        
              <button id="sign-up">
                Log In
              </button>
            </form>
            <p>Not registered yet? <button id="log-in" onClick={handleLoginModal}>Register</button> here</p>
          </div>
        </div>
      </div>
        ): (
          <div className="register-container">
        <div className="register-product-container">
          <div className="register-header">
            <button onClick={handleCloseModal} className="left-arrow">
              <FontAwesomeIcon icon={faArrowLeft} className="faArrowLeft" />
            </button>
            <h2>Register here !</h2>
          </div>
          <div className="form-container">
            <form onSubmit={handleSignUp}>
              <label htmlFor="firstName">Firstname: </label> <br />
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={signUpDetails.firstName}
                required
                onChange={(e) =>
                  {handleSignUpDetails("firstName", e.target.value)}
                }
              />{" "}
              <br />
              <label htmlFor="lastName">Lastname: </label> <br />
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={signUpDetails.lastName}
                required
                onChange={(e) =>
                  {handleSignUpDetails("lastName", e.target.value)}
                }
              />{" "}
              <br />
              <label htmlFor="email">Email: </label> <br />
              <input
                type="email"
                name="email"
                id="email"
                value={signUpDetails.email}
                required
                onChange={(e) => {handleSignUpDetails("email", e.target.value)}}
              />{" "}
              <br />
              <label htmlFor="mobile">Mobile: </label> <br />
              <input
                type="number"
                name="mobile"
                id="mobile"
                value={signUpDetails.mobile}
                required
                onChange={(e) => {handleSignUpDetails("mobile", e.target.value)}}
              />{" "}
              <br />
              <label htmlFor="dob">DOB: </label> <br />
              <input
                type="date"
                name="dob"
                id="dob"
                value={signUpDetails.dob}
                required
                onChange={(e) => {handleSignUpDetails("dob", e.target.value)}}
              />{" "}
              <br />
              <label htmlFor="">Gender: </label> <br />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                required
                onChange={(e) => {handleSignUpDetails("gender", e.target.value)}}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                required
                onChange={(e) => {handleSignUpDetails("gender", e.target.value)}}
              />
              <label htmlFor="others">Others</label>
              <input
                type="radio"
                name="gender"
                id="others"
                value="others"
                required
                onChange={(e) => {handleSignUpDetails("gender", e.target.value)}}
              />{" "}
              <br />
              <label htmlFor="password">Password: </label> <br />
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={(e) =>
                  {handleSignUpDetails("password", e.target.value)}
                }
              />{" "}
              <br />
              <label htmlFor="confirmFassword">confirmFassword: </label> <br />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={signUpDetails.confirmPassword}
                required
                onChange={(e) =>
                  {handleSignUpDetails("confirmPassword", e.target.value)}
                }
              />{" "}
              <br />
              <button id="sign-up">
                Sign Up
              </button>
            </form>
            <p>Already registered ? <button id="log-in" onClick={handleLoginModal}>LogIn</button> here</p>
          </div>
        </div>
      </div>
        )
      }
    </>
  );
}
