import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Main from "./pages/main";
import "./App.css";
import { useEffect, useState } from "react";
import ChangePassword from "./pages/changePassword";

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
