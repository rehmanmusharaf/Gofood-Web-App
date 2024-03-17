import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [errortext, setErrortext] = useState({
    namestyle: { display: "none" },
    passwordstyle: { display: "none" },
    locationstyle: { display: "none" },
  });

  function defaulterrtext() {
    setErrortext({
      namestyle: { display: "none" },
      passwordstyle: { display: "none" },
      locationstyle: { display: "none" },
    });
  }

  async function handlesubmit(e) {
    defaulterrtext();
    console.log(credentials.email);
    const passwordValidator =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;
    e.preventDefault();
    if (credentials.name.length < 3) {
      console.log("if condition run");
      setErrortext((prev) => {
        return { ...prev, namestyle: { display: "block" } };
      });
      return;
    } else if (
      credentials.password.length < 5 ||
      !passwordValidator.test(credentials.password)
    ) {
      setErrortext((prev) => {
        return { ...prev, passwordstyle: { display: "block" } };
      });
      console.log("password length less then 5");

      return;
    } else if (credentials.location.length < 20) {
      setErrortext((prev) => {
        return { ...prev, locationstyle: { display: "block" } };
      });
      return;
    }
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/login");
    } else {
      console.log(json.success);
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
          <label htmlFor="exampleInputname" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputname"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={onchangehandle}
          />
          <p className="text-danger" style={errortext.namestyle}>
            Name length is less then 20!
          </p>
        </div>
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

          <p className="text-danger" style={errortext.passwordstyle}>
            password Must Containt 1 upper case and 1 Special Character
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputlocation" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputlocation"
            name="location"
            value={credentials.location}
            onChange={onchangehandle}
          />
          <p style={errortext.locationstyle} className=" text-danger ">
            Location Contain Atleast 20 Characters
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-primary mx-3"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Signup;
