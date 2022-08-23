import React, { useState } from "react";
import "./styles/Home.css";
import axios from "axios";
import PaginationSection from "./PaginationSection";

function Home() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

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
    setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    function filterData(r) {
      setData(filterByValue(toString(r.data), searchText));
      console.log(data);
    }

    let apiUrl = "https://jsonplaceholder.typicode.com/comments";
    axios.get(apiUrl).then(filterData);
    e.preventDefault();
  }

  return (
    <div className="Home ">
      <header className="bg-primary text-white ">
        <div className="container d-flex justify-content-between pt-4">
          <div>Search results: 2010</div>
          <div>Username</div>
        </div>
      </header>
      <section className="pt-5 container">
        <div className="row   justify-content-center  mb-4">
          <form onSubmit={handleSubmit} className="col col-md-6">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control p-3"
                placeholder="Search for something"
                aria-label="Search for something"
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
            <span>
              API Link:{" "}
              <a href="https://jsonplaceholder.typicode.com/comments">
                https://jsonplaceholder.typicode.com/comments
              </a>
            </span>
          </form>
        </div>
      </section>
      <PaginationSection items={data} />
    </div>
  );
}

export default Home;