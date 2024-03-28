import React from "react";
import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Registration from "./pages/registration.jsx";
import Main from "./pages/main.jsx";
import "./App.css";
import { useEffect, useState } from "react";
import ChangePassword from "./pages/changePassword.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/registration"
            element={
              <Registration setLoggedIn={setLoggedIn} setEmail={setEmail} />
            }
          />
          <Route path="/main" element={<Main />} />
          <Route
            path="/changePassword"
            element={
              <ChangePassword />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
