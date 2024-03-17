import React from "react";
import "./Slider.css";
function Slider() {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      style={{ height: "600px", position: "relative" }}
    >
      <div className="carousel-inner" style={{ height: "100%" }}>
        <div className="carousel-item active image-container">
          <img
            alt="..."
            className="d-block w-100 image"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item image-container">
          <img
            alt="..."
            className="d-block w-100 image"
            src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item image-container">
          <img
            alt="..."
            className="d-block w-100 image"
            src="https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;
