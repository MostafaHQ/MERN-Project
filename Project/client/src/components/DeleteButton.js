import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteButton = (props) => {
  const { userId, successCallback } = props;
  const deleteUser = (e) => {
    if (window.confirm("Are you sure to delete this student")) {
      axios.delete("http://localhost:8000/api/users/" + userId).then((res) => {
        successCallback();
      });
    }
  };
  return (
    <div>
      <button className="btn btn-danger mt-2" onClick={deleteUser}>
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
