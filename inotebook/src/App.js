import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import { Signup } from "./components/Signup";



function App() {


  return (
    <>
      <div>
        <NoteState>
        
          <BrowserRouter>
          <Navbar />
          <Alert />
            <div className="container-md">
              <Routes>
                <Route exact path="/"  element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/about" element={<About />} />
              </Routes>
              
            </div>
          </BrowserRouter>
        </NoteState>
      </div>
    </>
  );
}

export default App;
