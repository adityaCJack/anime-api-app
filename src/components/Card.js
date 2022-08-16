import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ item, handleWishlistClick }) {
  //For creating more info URL
  let navigate = useNavigate();

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div className="card">
        <img
          src={item.images.jpg.image_url}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{item.titles[0].title}</h5>
          <p className="card-text">
            <b>Rating: </b>
            {item.rating}
          </p>
          <p className="card-text">
            <b>Popularity: </b>
            {item.popularity}
          </p>

          <button
            type="button"
            class="btn btn-primary mb-2 w-100"
            onClick={() => {
              navigate(`/${item.mal_id}`);
            }}
          >
            More info
          </button>

          <button
            onClick={() => handleWishlistClick(item)}
            className="btn btn-warning w-100"
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
