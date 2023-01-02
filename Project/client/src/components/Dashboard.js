import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Dashboard = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUsers, setallUsers] = useState(props.allUsers);

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
          {loggedInUser.role == 0 ? (
            <div>
              <p>Take Attendance</p>
              <ul>
                {allUsers.map((user, key) => {
                  return (
                    <div>
                      <li>{user.firstName}</li>
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
