import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home'

import Grade from "./components/grade/Grade";
import StudentList from "./pages/studentlist/StudentList";
import { TheContextProvider } from "./context/context";
// import axios from "axios";
function App() {

  
  return (
    <Router >
      <Topbar />
      <div className='bodyContainer'>
        <Sidebar />
        <TheContextProvider>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Grade/>} path="/grade/:gradeId" />
            <Route element={<StudentList />} path="/studentlist" />
          </Routes>
        </TheContextProvider>
      </div>
    </Router>
  );
}

export default App;
