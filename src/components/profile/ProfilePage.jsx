import React, { useEffect, useState } from "react";
import axios from "axios";

import "./ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState();

  let storageData = [];
  if (localStorage.getItem("user")) {
    storageData = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    const email = storageData[0].data.email;
    async function getUser(){
      try {
        const user = await axios.get(`http://localhost:8000/api/v1/users/login/${email}`);
        const data = await user.data
        setUser(data);
        
      } catch (error) {
        alert(error.message)
      }
    }
    getUser()
  }, []);
  console.log(user);
  return (
    <>
      <h1>ProfilePage</h1>
      <h3>{user?.firstName}</h3>
      <h3>{user?.lastName}</h3>
      <h3>{user?.email}</h3>
    </>
  );
}

export default ProfilePage;
