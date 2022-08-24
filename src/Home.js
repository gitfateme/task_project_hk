import React, { useState } from "react";
import "./styles/Home.css";
import axios from "axios";
import PaginatedItems from "./PaginatedItems";
import { getData } from "./app/newSlice";
import { useDispatch, useSelector} from "react-redux";

function Home() {
  const [keyword, setKeyword] = useState("");
  const username = useSelector((state) => state.new.username);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.new.data);

  function toString(o) {
    Object.keys(o).forEach((k) => {
      if (typeof o[k] === "object") {
        return toString(o[k]);
      }

      o[k] = "" + o[k];
    });

    return o;
  }

  function filterByValue(array, string) {
    return array.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    function filterData(r) {
      const newData = filterByValue(toString(r.data), keyword);
      dispatch(getData(newData));
    }

    let apiUrl = "https://jsonplaceholder.typicode.com/comments";
    axios.get(apiUrl).then(filterData);
  }

  return (
    <div className="Home ">
      <header className="bg-primary text-white ">
        <div className="container d-flex justify-content-between pt-4">
          <div>Search results: {data.length}</div>
          <div>
            {username ? (
              username
            ) : (
              <a href="/login" className="text-white text-decoration-none">
                Log in
              </a>
            )}
          </div>
        </div>
      </header>
      <section className="pt-5 container">
        <div className="row   justify-content-center  mb-4">
          <form onSubmit={handleSubmit} className="col col-md-6">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control p-3"
                placeholder="Search in API"
                aria-label="Search in API"
                aria-describedby="button-addon2"
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-primary px-3"
                type="submit"
                id="button-addon2"
              >
                Search
              </button>
            </div>
            <span  className="d-none d-sm-block">
              API Link:{" "}
              <a href="https://jsonplaceholder.typicode.com/comments">
                https://jsonplaceholder.typicode.com/comments
              </a>
            </span>
          </form>
        </div>
      </section>
      <PaginatedItems itemsPerPage={6} />
    </div>
  );
}

export default Home;
