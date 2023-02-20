import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../features/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataError = useSelector((state) => state.auth.dataError);
  const redirectLogin = useSelector((state) => state.auth.redirectLogin);//postData
  const postData = useSelector((state) => state.auth.postData);//

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    await dispatch(postLogin(formData));
  };
  useEffect(() => {
    if (redirectLogin === "true") {
      localStorage.setItem("auth_token", postData.token);
      localStorage.setItem("auth_name", postData.username);
      console.log(postData);
      navigate('/')
    }
  }, [redirectLogin]);

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
