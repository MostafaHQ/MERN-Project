import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import io from "socket.io-client";

const Dashboard = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUsers, setallUsers] = useState(props.allUsers);

  const [socket] = useState(() => io(":8000"));
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    socket.emit("chat", input);
  };

  useEffect(() => {
    socket.on("post chat", (msg) => {
      setMessages((prevmsgs) => {
        return [...prevmsgs, msg];
      });
    });
    return () => socket.disconnect(true);
  }, [socket]);

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

  // const takeAttendance=

  return (
    <div>
      {loggedInUser ? (
        <div>
          <h1>Hello {loggedInUser.firstName}</h1>
          <button onClick={logout}>Logout</button>
          {loggedInUser.role == 1 ? (
            <div>
              {messages.map((item, i) => {
                return <h4 key={i}>{item}</h4>;
              })}
            </div>
          ) : (
            ""
          )}

          {loggedInUser.role == 0 ? (
            <div>
              <p>Take Attendance</p>
              <form onSubmit={onSubmitHandler}>
                <input
                  type="text"
                  name="msg"
                  autoComplete="off"
                  onChange={onChangeHandler}
                />
                <input type="submit" value="submit" />
              </form>
              <ul>
                {allUsers.map((user, key) => {
                  return (
                    <div>
                      <li key={key}>{user.firstName}</li>
                      {/* <input type="/> */}
                      <button>Take attendance</button>
                    </div>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <h1>Please log in first</h1>
      )}
    </div>
  );
};

export default Dashboard;
