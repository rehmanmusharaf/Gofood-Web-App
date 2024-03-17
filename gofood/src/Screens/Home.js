import React, { useEffect, useState } from "react";
import Card from "../Compoenents/Card";
import Navbar from "../Compoenents/Navbar";
import Carausal from "../Compoenents/Slider.jsx";
// import SearchIcon from "@mui/icons-material/Search";
// import { search } from "../../../backend/Routes/routes.js";

import MyOrders from "../Compoenents/MyOrders.jsx";
export default function Home() {
  let [fooddata, setFooddata] = useState([]);
  let [searchval, setSearchval] = useState("");
  let [showorder, setShoworder] = useState(false);
  function inputchnagehandle(e) {
    setSearchval(e.target.value);
  }
  function handleorder() {
    console.log("handle Order Run!");
    setShoworder((prevval) =>
      prevval ? setShoworder(false) : setShoworder(true)
    );
  }
  async function getdata() {
    try {
      const response = await fetch("http://localhost:5000/api/getfood", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // console.log(data);
      setFooddata((prevval) => {
        return [...prevval, ...data];
      });
      // Log inside getdata will show the correct data
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <Navbar handleorder={handleorder} />
      {showorder ? <MyOrders handleorder={handleorder} /> : ""}
      <div style={{ position: "relative" }}>
        <Carausal />
        <div className="input-container">
          <input
            type="text"
            className="inputfield"
            value={searchval}
            onChange={inputchnagehandle}
          />
          {/* <SearchIcon className="search-icon" /> */}
        </div>
      </div>
      <div>
        {fooddata[1] ? (
          fooddata[1].map((value, index) => {
            if (searchval !== "") {
              if (index == 0) {
                return (
                  <div className="d-flex flex-wrap">
                    {fooddata[0].map((val, childindex) => {
                      if (
                        val.name
                          .toLowerCase()
                          .includes(searchval.toLocaleLowerCase())
                      ) {
                        return (
                          <Card
                            key={val._id}
                            id={val._id}
                            name={val.name}
                            img={val.img}
                            catname={val.CategoryName}
                            desc={val.description}
                            options={val.options}
                          />
                        );
                      }
                    })}
                  </div>
                );
              }
            } else {
              return (
                <div key={index}>
                  <h1 className=" mx-3 ">{value.CategoryName}</h1>
                  <div className=" d-flex   align-items-center flex-wrap ">
                    {fooddata[0].map((item, index) => {
                      return item.CategoryName === value.CategoryName ? (
                        <Card
                          id={item._id}
                          key={item._id}
                          name={item.name}
                          img={item.img}
                          catname={item.CategoryName}
                          desc={item.description}
                          price={item.options}
                          options={item.options}
                        />
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              );
            }
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}
