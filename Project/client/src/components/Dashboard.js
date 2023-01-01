import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/loggedin", {
        withCredentials: true,
      })
      .then((res) => {
        setLoggedInUser(res.data.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  const logout = (e) => {
    axios
      .get("http://localhost:8000/api/users/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <h1>Hello {loggedInUser.firstName}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <h1>Please log in first</h1>
      )}
    </div>
  );
};

export default Dashboard;
