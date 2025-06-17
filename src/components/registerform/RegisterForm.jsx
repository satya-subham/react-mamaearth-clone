import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MainContext } from "../../context/Context";
import axios from "axios";

import "./RegisterForm.css";

export default function () {
  const [loginModal, setLoginModal] = useState(false);
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
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: "",
  });

  const handleSignUpDetails = (type, value) => {
    setSignUpDetails((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleLogInDetails = (type, value) => {
    setLogInDetails((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const {
    isRegister,
    setIsRegister,
    user,
    setUser,
    registerModal,
    setRegisterModal,
  } = useContext(MainContext);

  const handleCloseModal = () => {
    setRegisterModal((prev) => !prev);
    setTimeout(() => {
      setIsRegister((prev) => !prev);
    }, 1000);
    document.body.style.overflow = "auto";
  };

  const handleLoginModal = () => {
    setLoginModal((prev) => !prev);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      if (signUpDetails.password != signUpDetails.confirmPassword) {
        return alert("confirmPassword must be matched with password");
      }

      const user = await fetch(
        "https://mamarath-backend.vercel.app/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpDetails),
        }
      );

      console.log(user);
      const data = await user.json();
      if (data) {
        alert(data.message);
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
      });

      if (!user) {
        throw new Error("Unable to register user");
      }
    } catch (error) {
      alert(error.message);
    }
    console.log(signUpDetails);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const user = await axios.post(
        "https://mamarath-backend.vercel.app/api/v1/users/login",
        logInDetails,
        { withCredentials: true }
      );

      const data = user.data;
      setUser(data.data);
      alert(data.message);
      console.log(user.data);

      setLogInDetails({
        email: "",
        password: "",
      });
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {loginModal ? (
        <div className="xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%] w-[100%] h-[100%] max-sm:w-[100%] max-sm:h-[100%] fixed top-0 left-0 bg-[rgba(0,0,0,0.638)] z-50">
          <div
            className={
              registerModal
                ? "xl:w-[30%] xl:h-[40%] lg:w-[30%] lg:h-[50%] md:w-[40%] md:h-[50%] sm:w-[45%] sm:h-[50%] max-sm:w-[70%] max-sm:h-[50%] bg-white absolute top-[20%] xl:left-[35%] md:left-[30%] sm:left-[30%] max-sm:left-[15%] rounded-[10px] animate-[dividend_1s_linear]"
                : "xl:w-[30%] xl:h-[40%] lg:w-[30%] lg:h-[50%] md:w-[40%] md:h-[50%] sm:w-[45%] sm:h-[50%] max-sm:w-[70%] max-sm:h-[50%] bg-white absolute top-[20%] xl:left-[35%] md:left-[30%] sm:left-[30%] max-sm:left-[15%] rounded-[10px] animate-[individend_1s_linear]"
            }
          >
            <div className="xl:h-[40px] shadow-[1px_2px_5px_0px_rgba(0, 0, 0, 0.75)]">
              <button
                onClick={handleCloseModal}
                className="bg-none border-none float-left m-2.5 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-lg text-blue-500"
                />
              </button>
              <h2 className="text-center text-amber-900 font-bold text-lg">
                LOG IN !
              </h2>
            </div>
            <div className="xl:w-[100%] xl:h-[100%] lg:w-[100%] lg:h-[100%] md:w-[100%] md:h-[100%] sm:w-[100%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%] bg-gray-400 absolute rounded-sm">
              <form onSubmit={handleLogIn}>
                <label htmlFor="email">Email: </label> <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] lg:h-[4vh] md:w-[80%] md:h-[4vh] sm:w-[80%] sm:h-[4vh] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={logInDetails.email}
                  onChange={(event) =>
                    handleLogInDetails("email", event.target.value)
                  }
                  required
                />{" "}
                <br />
                <label htmlFor="password">Password: </label> <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] md:h-[4vh] sm:w-[80%] sm:h-[4vh] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={logInDetails.password}
                  onChange={(event) =>
                    handleLogInDetails("password", event.target.value)
                  }
                  required
                />{" "}
                <br />
                <button
                  id="sign-up"
                  className="xl:w-[20%] lg:w-[30%] md:w-[30%] xl:h-[4vh] lg:h-[5vh] md:h-[5vh] sm:w-[30%] sm:h-[5vh] max-sm:w-[30%] max-sm:h-[5vh] bg-[rgb(40,135,40)] text-white rounded-md border-none cursor-pointer"
                >
                  LOG IN
                </button>
              </form>
              <p className="text-blue-700 text-center">
                Not registered yet?{" "}
                <button
                  id="log-in"
                  className="xl:w-[20%] xl:h-[4vh] lg:w-[30%]  lg:h-[5vh] md:w-[30%] md:h-[5vh] sm:w-[25%] sm:h-[5vh] max-sm:w-[25%] max-sm:h-[5vh] bg-[rgb(53,70,53)] text-white border-none rounded-md cursor-pointer"
                  onClick={handleLoginModal}
                >
                  SIGN UP
                </button>{" "}
                here
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%] w-[100%] h-[100vh] max-sm:w-[100%] max-sm:h-[100%] fixed top-0 left-0 bg-[rgba(0,0,0,0.638)] z-50">
          <div
            className={
              registerModal
                ? "xl:w-[30%] xl:h-[90%] lg:w-[40%] lg:h-[90%] md:w-[40%] md:h-[90%] sm:w-[50%] sm:h-[90%] max-sm:w-[70%] max-sm:h-[90%] bg-white absolute top-[2%] xl:left-[35%] lg:left-[30%] md:left-[30%] sm:left-[27%] max-sm:left-[15%] rounded-[10px] animate-[dividend_1s_linear]"
                : "xl:w-[30%] xl:h-[90%] lg:w-[40%] lg:h-[90%] md:w-[40%] md:h-[90%] sm:w-[50%] sm:h-[90%] max-sm:w-[70%] max-sm:h-[90%] bg-white absolute top-[2%] xl:left-[35%] lg:left-[30%] md:left-[30%] sm:left-[27%] max-sm:left-[15%] rounded-[10px] animate-[individend_1s_linear]"
            }
          >
            <div className="xl:h-[40px] shadow-[1px_2px_5px_0px_rgba(0, 0, 0, 0.75)]">
              <button
                onClick={handleCloseModal}
                className="bg-none border-none float-left m-2.5 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-lg text-blue-500"
                />
              </button>
              <h2 className="text-center text-amber-900 font-bold text-lg">
                SIGN UP !
              </h2>
            </div>
            <div className="xl:w-[100%] xl:h-[100%] lg:w-[100%] lg:h-[100%] md:w-[100%] md:h-[100%] sm:w-[100%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%] bg-gray-400 absolute rounded-sm">
              <form onSubmit={handleSignUp}>
                <label htmlFor="firstName">Firstname: </label> <br />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] sm:w-[80%] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={signUpDetails.firstName}
                  required
                  onChange={(e) => {
                    handleSignUpDetails("firstName", e.target.value);
                  }}
                />{" "}
                <br />
                <label htmlFor="lastName">Lastname: </label> <br />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] sm:w-[80%] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={signUpDetails.lastName}
                  required
                  onChange={(e) => {
                    handleSignUpDetails("lastName", e.target.value);
                  }}
                />{" "}
                <br />
                <label htmlFor="email">Email: </label> <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] sm:w-[80%] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={signUpDetails.email}
                  required
                  onChange={(e) => {
                    handleSignUpDetails("email", e.target.value);
                  }}
                />{" "}
                <br />
                <label htmlFor="mobile">Mobile: </label> <br />
                <input
                  type="number"
                  name="mobile"
                  id="mobile"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] sm:w-[80%] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={signUpDetails.mobile}
                  required
                  onChange={(e) => {
                    handleSignUpDetails("mobile", e.target.value);
                  }}
                />{" "}
                <br />
                <label htmlFor="dob">DOB: </label> <br />
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] sm:w-[80%] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={signUpDetails.dob}
                  required
                  onChange={(e) => {
                    handleSignUpDetails("dob", e.target.value);
                  }}
                />{" "}
                <br />
                <label htmlFor="">Gender: </label> <br />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  className="xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[10%] max-sm:w-[10%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500"
                  value="male"
                  required
                  onChange={(e) => {
                    handleSignUpDetails("gender", e.target.value);
                  }}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  className="xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[10%] max-sm:w-[10%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500"
                  required
                  onChange={(e) => {
                    handleSignUpDetails("gender", e.target.value);
                  }}
                />
                <label htmlFor="others">Others</label>
                <input
                  type="radio"
                  name="gender"
                  id="others"
                  value="others"
                  className="xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[10%] max-sm:w-[10%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500"
                  required
                  onChange={(e) => {
                    handleSignUpDetails("gender", e.target.value);
                  }}
                />{" "}
                <br />
                <label htmlFor="password">Password: </label> <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] sm:w-[80%] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  required
                  onChange={(e) => {
                    handleSignUpDetails("password", e.target.value);
                  }}
                />{" "}
                <br />
                <label htmlFor="confirmFassword">ConfirmPassword: </label>{" "}
                <br />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="xl:w-[80%] xl:h-[4vh] lg:w-[80%] md:w-[80%] sm:w-[80%] max-sm:w-[80%] rounded-[5px] border-none bg-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-700"
                  value={signUpDetails.confirmPassword}
                  required
                  onChange={(e) => {
                    handleSignUpDetails("confirmPassword", e.target.value);
                  }}
                />{" "}
                <br />
                <button
                  id="sign-up"
                  className="xl:w-[20%] lg:w-[20%] md:w-[30%] xl:h-[4vh] md:h-[5vh] sm:w-[30%] sm:h-[5vh] max-sm:w-[30%] bg-[rgb(40,135,40)] max-sm:h-[5vh] text-white rounded-md border-none cursor-pointer"
                >
                  SIGN UP
                </button>
              </form>
              <p className="text-blue-700 text-center">
                Already registered ?{" "}
                <button
                  id="log-in"
                  className="xl:w-[20%] lg:w-[20%] md:w-[20%] xl:h-[4vh] md:h-[5vh] sm:w-[20%] sm:h-[5vh] max-sm:w-[20%] max-sm:h-[5vh] bg-[rgb(53,70,53)] text-white border-none rounded-md cursor-pointer"
                  onClick={handleLoginModal}
                >
                  LOG IN
                </button>{" "}
                here
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
