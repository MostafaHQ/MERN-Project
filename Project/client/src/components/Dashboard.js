import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import io from "socket.io-client";
import DeleteButton from "./DeleteButton";

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

  const removeFromDom = (userId) => {
    setallUsers(allUsers.filter((user) => user._id !== userId));
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
                      <button>Take attendance</button>
                      <DeleteButton
                        userId={user._id}
                        successCallBack={() => removeFromDom(user._id)}
                      />
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
      <Link to="/addavatar">a,imuinuy</Link>
    </div>
  );
};

export default Dashboard;
