import React from "react";
import Product from "./components/Product";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import {Routes,Route} from "react-router-dom"
import Login from './components/Login'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/admin/" element={<Admin />}>
          <Route path="/admin/category" element={<Category/>}></Route>
          <Route path="/admin/navbar" element={<Navbar/>}></Route>
          <Route path="/admin/product" element={<Product/>}></Route>
        </Route>
        <Route path="/product" element={<Product/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
