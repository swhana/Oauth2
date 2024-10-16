import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginSuccess from "./LoginSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/success" element={<LoginSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
