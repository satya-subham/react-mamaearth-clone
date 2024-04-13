import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { MainContext } from "../../context/Context";

import "./ProfilePage.css";

function ProfilePage() {
  const { user, setUser } = useContext(MainContext);

  console.log(user);
  return (
    <>
      <div className="profile-page-container">
        <h1>Profile Details</h1>
        <h3>{user?.firstName}</h3>
        <h3>{user?.lastName}</h3>
        <h3>{user?.email}</h3>
      </div>
    </>
  );
}

export default ProfilePage;
