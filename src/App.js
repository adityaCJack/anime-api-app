import "./App.css";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Moreinfo from "./components/Moreinfo";

function App() {
  //API fetching and adding it to state
  const [info, setInfo] = useState();

  function getApiData() {
    axios
      .get("https://api.jikan.moe/v4/anime")
      .then((response) => setInfo(response.data.data));
  }

  //Calling when browser loads
  useEffect(() => {
    getApiData();
  }, []);

  //For storing data to localstorage
  useEffect(() => {
    localStorage.setItem("Mywishlist", JSON.stringify(wishlist));
  });

  // Search field function
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = info.filter((item) => {
        return item.titles[0].title
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(info);
    }
  };

  //Filter by genres
  const [filteredDataFromGenres, setfilteredDataFromGenres] = useState(info);
  const filterResult = (genre) => {
    if (genre === "clear") {
      return setfilteredDataFromGenres(info);
    }
    const result = info.filter((item) => {
      return item.genres[0].name.toLowerCase() === genre;
    });

    setfilteredDataFromGenres(result);
  };

  //Wishlist handle
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("Mywishlist")) || []
  );
  function handleWishlistClick(item) {
    setWishlist([...wishlist, item]);
  }

  return (
    <div className="container-fluid">
      <div className="row main-content">
        <div className="col-lg-3 sidebar">
          <Sidebar
            searchItems={searchItems}
            filterResult={filterResult}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        </div>
        {/* Used nested ternary to display Animes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="col-lg-9">
                <div className="row">
                  {searchInput.length > 1
                    ? filteredResults.map((item) => {
                        return (
                          <Card
                            item={item}
                            handleWishlistClick={handleWishlistClick}
                          />
                        );
                      })
                    : filteredDataFromGenres
                    ? filteredDataFromGenres.map((item) => {
                        return (
                          <Card
                            item={item}
                            handleWishlistClick={handleWishlistClick}
                          />
                        );
                      })
                    : info
                    ? info.map((item) => {
                        return (
                          <Card
                            item={item}
                            handleWishlistClick={handleWishlistClick}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            }
          />

          <Route path="/:AnimeID" element={<Moreinfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
