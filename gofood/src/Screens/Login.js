import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errortext, setErrortext] = useState({ display: "none" });

  function defaulterrtext() {
    setErrortext({ display: "none" });
  }

  async function handlesubmit(e) {
    defaulterrtext();
    console.log(credentials.email);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.token);
      localStorage.setItem("email", credentials.email);

      console.log(localStorage.getItem("authToken"));
      navigate("/");
    } else {
      console.log(json.success);
      setErrortext({ display: "block" });
    }
  }
  function onchangehandle(e) {
    setCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputemail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputemail"
            name="email"
            value={credentials.email}
            onChange={onchangehandle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            name="password"
            value={credentials.password}
            onChange={onchangehandle}
            autoComplete="off"
          />

          <p className="text-danger" style={errortext}>
            Invalid Credemntials
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-primary mx-3"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register Your Acount
        </button>
      </form>
    </div>
  );
}

export default Login;
