import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { MainContext } from "../../context/Context";

import "./ProfilePage.css";
import { useSelector } from "react-redux";

function ProfilePage() {
  const {name, email} = useSelector((state) => state.cart);

  return (
    <>
      {
        name ? (
          <div className="profile-page-container">
            <h1>Profile Details</h1>
            <h3>{name}</h3>
            <h3>{email}</h3>
        </div>
        ) : (
          <div className="profile-page-container">
           <p>Please Login</p>
          </div>
        )
      }
    </>
  );
}

export default ProfilePage;
