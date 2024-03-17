import React, { useEffect } from "react";
import "./Myorder.css";
// import CancelIcon from "@mui/icons-material/Cancel";
// import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "./ContextReducer";
import { useDispatchcart } from "./ContextReducer";
export default function MyOrders(props) {
  let dispatch = useDispatchcart();
  let data = useCart();
  // console.log("data is " + data);
  async function handledispatch(value) {
    const obj = { ...value, type: "remove" };
    await dispatch(obj);
  }
  async function handlecart() {
    dispatch({ type: "checkout" });
    // console.log(data);
    console.log("handle cart run");
  }
  // console.log("rendering");
  return (
    <div>
      <div className="overlay"></div>
      <div className="myorder-container">
        <div
          className="fs-3 position-relative d-flex justify-content-center align-items-center "
          style={{ height: "100%" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cross-icon bi bi-x-circle-fill"
            onClick={props.handleorder}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
          </svg>
          {/* <CancelIcon /> */}
          <div className="myorderlist">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Option</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.name}</td>
                      <td>{value.qty}</td>
                      <td>{value.size}</td>
                      <td>{value.price}</td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash DeleteIcon"
                          viewBox="0 0 16 16"
                          onClick={() => handledispatch(value)}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                        {/* <DeleteIcon
                        /> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="btn btn-success" onClick={() => handlecart()}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
