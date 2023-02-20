import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavbarComponents from "./components/NavbarComponents";
import Barang from "./pages/barang/Barang";
import Create from "./pages/barang/Create";
import Detail from "./pages/barang/Detail";
import Home from "./pages/Home";
import Suplier from "./pages/suplier/Suplier";
import SuplierCreate from "./pages/suplier/Create";
import SuplierEdit from "./pages/suplier/Edit";
import Edit from "./pages/barang/Edit";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarComponents/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barang" element={<Barang />} />
          <Route path="/create" element={<Create />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/product/:id/edit" element={<Edit />} />


          <Route path="/suplier" element={<Suplier />} />
          <Route path="/suplier/create" element={<SuplierCreate />} />
          <Route path="/suplier/:id" element={<SuplierEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
