import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar(props) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand text-light fs-2" to="/">
          Gofood
        </Link>
        <div style={{ marginRight: "auto" }}>
          <Link className="navbar-brand text-light">Home</Link>
          {localStorage.getItem("authToken") ? (
            <Link className="navbar-brand text-light" to="orders">
              My Order
            </Link>
          ) : (
            ""
          )}
        </div>
        <div style={{ marginLeft: "auto" }}>
          {localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <div
                className=" btn btn-danger text-light mx-2"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  navigate("/login");
                }}
              >
                Logout
              </div>
              <div
                className=" btn btn-success text-light mx-2"
                onClick={props.handleorder}
              >
                My Cart
              </div>
            </div>
          ) : (
            <div className="d-flex">
              <div
                className=" bg-dark  btn btn-light text-light bg-light mx-2"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </div>
              <div
                className="bg-dark  btn btn-light text-light bg-light mx-2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
