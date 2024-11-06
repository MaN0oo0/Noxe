import axios from "axios";
import React, { useEffect, useState } from "react";

import RenderMovies from "../../AssetsComponents/RenderMovies/RenderMovies";
export default function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  let getTrendingMovies = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=c636ed7787cc302d96bf88ccf334e0d8"
    );
    setTrendingMovies(data.results);
  };

  //on component open
  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <>
    <RenderMovies data={trendingMovies} title={'Movies'}/>
      {/* <div className="row">
        <div className="col-md-4">
          <div className="welcome">
          <div className="brdr w-25 mb-3"> </div>
            <h3>
              Trending <br /> Movies <br /> to watch now
            </h3>
            <p style={{ color: "rgb(79,68,68)" }}>most watched movies by day</p>
          <div className="brdr"> </div>
          </div>
        </div>
        {trendingMovies.slice(0, 10).map((movie, index) => {
          return (
            <div key={index} className="col-md-2 ">
              <div className={`${styles.item}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  height="200px"
                  width="150px"
                  alt={`${movie.title}`}
                  loading="lazy"
                />
                <div className=" w-auto bg-transparent mt-2">
                  <h2 className="h6">{movie.title}</h2>
                </div>
                <span className={`${styles.vote_number}`}>
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
