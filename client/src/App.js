import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage/:userId" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
