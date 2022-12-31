import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const CreateUser = () => {
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "", 
  });

  const [errors, setErrors] = useState([]);

  const changehandler = (e) => {
    console.log(e.target.name)
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", formInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Register Below</h1>
      <form onSubmit={register}>
        <div className="form-group mb-2">
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            onChange={changehandler}
          />
          {errors.firstName ? (
            <p className="text-danger">{errors.firstName.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            onChange={changehandler}
          />
          {errors.lastName ? (
            <p className="text-danger">{errors.lastName.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label>Email: </label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={changehandler}
          />
          {errors.email ? (
            <p className="text-danger">{errors.email.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={changehandler}
          />
          {errors.password ? (
            <p className="text-danger">{errors.password.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-3">
          <label>Confirm  Password: </label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            onChange={changehandler}
          />
          {errors.confirmPassword ? (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          ) : (
            ""
          )}
        </div>
        {/* <input
          type="file"
          name="avavtar"
          placeholder="avatar"
          onChange={(e) => {
            setAvatar(e.target.files[0]);
          }}
        ></input> */}
        <input
          type="submit"
          className="btn btn-primary col-md-2"
          value="Sign up"
        ></input>

      </form>
    </>
  );
};

export default CreateUser;
