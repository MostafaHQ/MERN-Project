import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const AddPhoto = () => {
  const [errors, setErrors] = useState([]);
  const [loadedEr, setLoadedEr] = useState([]);
  const [registerdUser, setRegisterdUser] = useState({});
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/loggedin", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("this is who reg:", registerdUser);
        setRegisterdUser(res.data.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // navigate("/");
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hiiiiiiiiii");
    //make a post request to create a new product
    const formData = new FormData();
    console.log(avatar)
    formData.append("avatar", avatar);
    formData.append("user_id", registerdUser._id);

    axios
      .post("http://localhost:8000/api/photo", formData)
      .then((res) => {
        console.log(res);
        // navigate("/dashboard");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) {
          // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message);
        }
        // Set Errors
        setErrors(errorArr);
        setLoadedEr(true);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          placeholder="avatar"
          onChange={(e)=>{setAvatar(e.target.files[0])}}

        ></input>
        <input
          type="submit"
          className="btn btn-primary col-md-2"
          value="Add Avatar"
        ></input>
      </form>
    </div>
  );
};

export default AddPhoto;
