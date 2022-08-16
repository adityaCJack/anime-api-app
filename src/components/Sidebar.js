import React from "react";

function Sidebar({ searchItems, filterResult, wishlist, setWishlist }) {
  function handleDelete(id) {
    const newArray = wishlist.filter((item) => item.mal_id !== id);
    setWishlist(newArray);
  }

  return (
    <div>
      <h4 className="sidebar-heading mt-2">Search:</h4>
      <div class="input-group">
        <input
          icon="search"
          class="form-control mt-2 mb-3"
          placeholder="Search by title"
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
      <h4 className="sidebar-heading">Filter by genres:</h4>
      <div className="d-flex justify-content-between pt-2">
        <button
          className="btn btn-primary "
          onClick={() => filterResult("adventure")}
        >
          Adventure
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => filterResult("action")}
        >
          Action
        </button>
        <button
          className="btn btn-success"
          onClick={() => filterResult("sports")}
        >
          Sports
        </button>
      </div>
      <div className="d-flex justify-content-between pt-2">
        <button className="btn btn-info" onClick={() => filterResult("comedy")}>
          Comedy
        </button>
        <button
          className="btn btn-warning"
          onClick={() => filterResult("drama")}
        >
          Drama
        </button>

        <button
          className="btn btn-danger"
          onClick={() => filterResult("clear")}
        >
          Clear All
        </button>
      </div>

      <h4 className="sidebar-heading mt-3">My wishlist:</h4>
      {wishlist.map((item) => {
        return (
          <p className="d-flex justify-content-between pt-2">
            {item.titles[0].title}{" "}
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(item.mal_id)}
            >
              X
            </button>
          </p>
        );
      })}
    </div>
  );
}

export default Sidebar;
