import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [username, setUsername] = useState("");

  function handleLogin(username) {
    setUsername(username);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home username={username} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
