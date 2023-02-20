import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BarangCreate from "./pages/barang/BarangCreate";
import BarangList from "./pages/barang/BarangList";
import BarangUpdate from "./pages/barang/BarangUpdate";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SuplierCreate from "./pages/suplier/SuplierCreate";
import SuplierEdit from "./pages/suplier/SuplierEdit";
import SuplierList from "./pages/suplier/SuplierList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route  path="dashboard" element={<Dashboard />}>
          <Route path="suplier" element={<SuplierList />} />
          <Route path="suplier/create" element={<SuplierCreate />} />
          <Route path="suplier/:id/edit" element={<SuplierEdit />} />
          <Route path="barang" element={<BarangList />} />
          <Route path="barang/create" element={<BarangCreate />} />
          <Route path="barang/:id/edit" element={<BarangUpdate />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
