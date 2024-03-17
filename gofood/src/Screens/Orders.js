import React from "react";
import Navbar from "../Compoenents/Navbar";
import Order from "../Compoenents/Order";
import { Ordersdetail } from "../Compoenents/ContextReducer";

function Orders() {
  const outcome = Ordersdetail();
  console.log("outcomes :  ", outcome);
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-wrap justify-content-around"
        style={{ marginTop: "40px" }}
      >
        {outcome
          ? outcome.map((value, index) => {
              console.log(value);
              return <Order key={index} data={value} />;
            })
          : ""}
      </div>
    </>
  );
}

export default Orders;
