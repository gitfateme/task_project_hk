// import React from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function hadnleSubmit(e) {
    e.preventDefault();
    props.handleLogin(username);
    navigate("/");
  }
  function handleChange(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="Login row justify-content-center mt-5">
      <form
        className="col-12 col-sm-6 col-lg-3 border rounded p-5"
        onSubmit={hadnleSubmit}
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
