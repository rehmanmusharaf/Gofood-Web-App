import React, { useEffect, useState } from "react";
import { useCart, useDispatchcart } from "../Compoenents/ContextReducer.jsx";
import { Link } from "react-router-dom";
function Card(props) {
  let dispatch = useDispatchcart();
  // console.log(props.options);
  let data = useCart();
  const [quant, setQuant] = useState(1);
  const [size, setSize] = useState(props.options[0].half ? "half" : "regular");
  const [finalprice, setFinalprice] = useState(
    props.options[0].half || props.options[0].regular
  );

  const handlecart = async () => {
    console.log(quant);
    await dispatch({
      type: "ADD",
      id: props.id,
      name: props.name,
      qty: quant,
      price: quant * props.options[0][size],
      size: size,
    });
  };

  return (
    <div className=" m-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={props.img}
          alt="Card image cap"
          style={{ height: "220px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p
            className="card-text"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "pre",
            }}
          >
            {props.desc}
          </p>
          <div className="d-flex  align-items-center ">
            <select
              name=""
              id=""
              className="bg-success text-light"
              onChange={(e) => setQuant(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            {props.options.map((val, index) => {
              // setFinalprice(val[0]);

              return (
                // <>
                <select
                  name=""
                  id=""
                  className="mx-3 bg-success text-light"
                  key={index}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {Object.keys(val).map((val2, index2) => {
                    return (
                      <option value={val2} key={index2}>
                        {val2}
                      </option>
                    );
                  })}
                </select>
              );
            })}
            {/* <option value="full">Full</option> */}
            <p className="fs-3 mb-2">{finalprice * quant} rp</p>
          </div>

          <hr />
          <Link to="#" className="btn btn-primary" onClick={handlecart}>
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
