import React from "react";
import styles from "./Movies.module.scss";
export default function RenderMovies(props) {
  const { data,title } = props;
  let Range=Math.floor(Math.random() * (10 - 5 + 1) + 5);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="welcome">
            <div className="brdr w-25 mb-3"> </div>
            <h3>
              Trending <br />  {title}<br /> to watch now
            </h3>
            <p style={{ color: "rgb(79,68,68)" }}>most watched {title} by day</p>
            <div className="brdr"> </div>
          </div>
        </div>
        {data.slice(0, Range).map((movie, index) => {
          return (
            <div key={index} className={`col-md-2 ${movie.profile_path===null?'d-none':''}`}>
              <div className={`${styles.item}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path||movie.profile_path}`}
                  height="200px"
                  width="150px"
                  alt={`${movie.title||movie.name}`}
                  loading="lazy"
                />
                <div className=" w-auto bg-transparent mt-2">
                  <h2 className="h6">{movie.title||movie.name}</h2>
                </div>
                <span className={`${styles.vote_number} ${!movie.vote_average?'d-none':''}`}>
                  {movie.vote_average&&movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
