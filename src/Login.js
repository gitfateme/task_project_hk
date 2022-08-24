// import React from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInput } from "./app/newSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function hadnleSubmit(e) {
    e.preventDefault();
    navigate("/");
  }
  function handleChange(e) {
    dispatch(getUserInput(e.target.value));
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
