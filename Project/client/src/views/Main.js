import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
const Main = () => {
  const [allUsers, setallUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/allusers")
      .then((res) => {
        console.log(res.data);
        setallUsers(res.data);
        console.log(allUsers);
        setLoaded(true);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  console.log(allUsers);
  return <div>{loaded && <Dashboard allUsers={allUsers}></Dashboard>}</div>;
};

export default Main;
