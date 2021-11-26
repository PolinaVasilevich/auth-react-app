import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/useMessage.hook";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { request, loading, error, clearError } = useHttp();

  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = async () => {
    try {
      await request("http://localhost:5000/api/auth/register", "POST", {
        ...form,
      });
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        "http://localhost:5000/api/auth/login",
        "POST",
        { ...form }
      );

      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Auth Page</h1>
        <div className="card ">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter username"
                  id="username"
                  type="text"
                  name="username"
                  onChange={changeHandler}
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              className="btn yellow darken-4 btn-login"
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
