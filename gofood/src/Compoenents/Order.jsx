import React from "react";

function Order(props) {
  console.log(props);
  return (
    <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{props.data.name}</h5>
        <h5 className=" text-success ">Price {props.data.price} pkr</h5>
        <h5>Date {props.data.data}</h5>
        <h5>Size {props.data.size}</h5>
        <p className="card-text">Quantity: {props.data.qty}</p>
        {props.data.delivered ? (
          <div className="btn btn-primary">Delivered</div>
        ) : (
          <div className="btn btn-danger">Pending</div>
        )}
      </div>
    </div>
  );
}

export default Order;
