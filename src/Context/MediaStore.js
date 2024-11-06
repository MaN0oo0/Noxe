import axios from "axios";
import { createContext, useEffect, useState } from "react";

import React from "react";
export let mediaContext = createContext({});

export default function MediaStore(props) {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [people, setPeople] = useState([]);
  let [Tvshows, settVShows] = useState([]);

  let getTrendingItems = async (mediaType, callback) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
    );
    callback(data.results);
  };

  useEffect(() => {
    getTrendingItems("movie", setTrendingMovies);
    getTrendingItems("person", setPeople);
    getTrendingItems("tv", settVShows);
  }, []);
  return (
    <>
      <mediaContext.Provider value={{ trendingMovies, people, Tvshows }}>
        {props.children}
      </mediaContext.Provider>
    </>
  );
}
