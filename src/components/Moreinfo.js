import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

function Moreinfo() {
  const [data, setData] = useState();
  const { AnimeID } = useParams();

  if (AnimeID !== "") {
    fetch(`https://api.jikan.moe/v4/anime/${AnimeID}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
      });
  }

  return (
    <div className="col-lg-9">
      <div className="more-info">
        {data && (
          <>
            <h1 className="d-flex justify-content-between">
              {data.title}{" "}
              <Link className="btn btn-success pt-2" to="/">
                Go back
              </Link>
            </h1>
            <img src={data.images.jpg.image_url} className="vh-100" alt="..." />
            <h2>Synopsis:</h2>
            <p>{data.synopsis}</p>
            <h3>Duration: </h3>
            <p>{data.duration}</p>
            <h3>Rating: </h3>
            <p>{data.rating}</p>
            <h3>Trailer: </h3>
            <p>{data.trailer.url}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Moreinfo;
