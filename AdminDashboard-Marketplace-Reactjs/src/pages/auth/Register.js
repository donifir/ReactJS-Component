import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../features/authSlice";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataError = useSelector((state) => state.auth.dataError);
  const redirectRegister = useSelector((state) => state.auth.redirectRegister);


  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);

    await dispatch(postRegister(formData));
  };
  useEffect(() => {
    if (redirectRegister==="true") {
      navigate('/')
    }
  }, [redirectRegister]);

  useEffect(() => {
    if (dataError) {
      setError(dataError);
    }
  }, [dataError]);

  return (
    <div className="card-body login-card-body d-flex justify-content-center">
      <div className="login-box">
        <div className="card">
          <div className="card-header">
            <div className="login-logo">
              <a href="/index2.html">
                <b>Admin</b>LTE
              </a>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={formHandler}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="text-danger">{error.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-danger">{error.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="text-danger">{error.password}</span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="text-danger">{error.confirm_password}</span>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
