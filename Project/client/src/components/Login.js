import { navigate } from "@reach/router";
import axios from "axios";
import React, { useState } from "react";
import Register from "./Register";

const Login = () => {
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });

  const changehandler = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", formInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        if(res.data.msg=="success!"){
          navigate("/dashboard")
        }else{
          
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row d-flex">
      <Register />
      <h1>Login Below</h1>
      <form onSubmit={login}>
        <div className="form-group mb-2">
          <label>Email: </label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={changehandler}
          />
          {/* {errors.email ? (
            <p className="text-danger">{errors.email.message}</p>
          ) : (
            ""
          )} */}
        </div>
        <div className="form-group mb-2">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={changehandler}
          />
          {/* {errors.password ? (
            <p className="text-danger">{errors.password.message}</p>
          ) : (
            ""
          )} */}
        </div>
        <input
          type="submit"
          className="btn btn-primary col-md-2"
          value="Login"
        ></input>
      </form>
    </div>
  );
};

export default Login;
