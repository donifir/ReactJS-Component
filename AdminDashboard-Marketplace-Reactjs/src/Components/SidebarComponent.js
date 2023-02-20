import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { postLogout } from "../features/authSlice";

export default function SidebarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectLogout = useSelector((state) => state.auth.redirectLogout);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(postLogout());
  };

  useEffect(() => {
    if (redirectLogout === "true") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_name");
      navigate("/");
    }
  }, [redirectLogout]);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="/adminLTE/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/adminLTE/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
     with font-awesome or any other icon font library */}
            <li className="nav-item">
              <NavLink to={'/dashboard/suplier'} className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                  Suplier
                </p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/dashboard/barang'} className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                  Barang
                </p>
              </NavLink>
            </li>

            <li className="nav-item">
              <a href="pages/widgets.html" className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                  Widgets
                  <span className="right badge badge-danger">New</span>
                </p>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" onClick={logoutHandler}>
                <i className="nav-icon fas fa-th" />
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
