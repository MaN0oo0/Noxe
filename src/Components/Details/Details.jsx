import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details(props) {
  const [movieDetail, setMovieDetail] = useState([]);
  const { id, type } = useParams();
  const loadData = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=c636ed7787cc302d96bf88ccf334e0d8`
    );
    setMovieDetail(data);

    console.log(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="row   d-flex justify-content-center col-md-10 align-items-center">
        {type === "person" && (
          <>
            <div className="col-md-4 mt-2">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieDetail.profile_path}`}
       height="300px"
                width="250px"
                alt={`${movieDetail.name}`}
                loading="lazy"
              />
            </div>
            <div className="col-md-4 mt-2">
              <h2 className="h6">
                <b>Name</b>: {movieDetail.name}
              </h2>
              <h2 className="h6">
                <b>Birthday Date</b>: {movieDetail.birthday}
              </h2>
              <p>
                <b>biography</b>:{" "}
                {movieDetail.biography &&
                  movieDetail.biography.split(",").slice(0, 5).join("")}
              </p>
              {/* <div className="d-flex w-100 align-items-center gap-2">
                <b>Rate:</b>
                <label className="btn btn-success btn-sm my-1">
                  <span> {movieDetail.vote_average&&movieDetail.vote_average.toFixed(1)} <i className="fa fa-star"></i></span>
                </label>
                <br />
              </div> */}
              {movieDetail.genres && (
                <div className="genres">
                  <b>Genres</b>:
                  {movieDetail.genres.map((e) => {
                    return (
                      <label
                        key={e.id}
                        className="btn btn-primary btn-sm my-1 mx-2"
                      >
                        {e.name}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
        {type === "movie" && (
          <>
            <div className="col-md-4 mt-2">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
                height="300px"
                width="250px"
                alt={`${movieDetail.title}`}
                loading="lazy"
              />
            </div>
            <div className="col-md-4 mt-2">
              <h2 className="h6">
                <b>Name</b>: {movieDetail.title}
              </h2>
              <h2 className="h6">
                <b>Release Date</b>: {movieDetail.release_date}
              </h2>
              <p>
                <b>Overview</b>: {movieDetail.overview}
              </p>
              <div className="d-flex w-100 align-items-center gap-2">
                <b>Rate:</b>
                <label className="btn btn-success btn-sm my-1">
                  <span>
                    {" "}
                    {movieDetail.vote_average &&
                      movieDetail.vote_average.toFixed(1)}{" "}
                    <i className="fa fa-star"></i>
                  </span>
                </label>
                <br />
              </div>
              {movieDetail.genres && (
                <div className="genres">
                  <b>Genres</b>:
                  {movieDetail.genres.map((e) => {
                    return (
                      <label
                        key={e.id}
                        className="btn btn-primary btn-sm my-1 mx-2"
                      >
                        {e.name}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
        {type === "tv" && (
          <>
            <div className="col-md-8">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
                height="400px"
                width="350px"
                alt={`${movieDetail.name}`}
                loading="lazy"
              />
            </div>
            <div className="col-md-4 mt-2">
              <h2 className="h6">
                <b>Name</b>: {movieDetail.name}
              </h2>
              <h2 className="h6">
                <b>Release Date</b>: {movieDetail.first_air_date}
              </h2>
              <p>
                <b>Overview</b>: {movieDetail.overview}
              </p>
              <div className="d-flex w-100 justify-content-evenly">
                <label className="btn btn-success btn-sm my-1">
                  <span>Seasons: {movieDetail.number_of_seasons}</span>
                </label>
                <br />
                <label className="btn btn-info btn-sm">
                  <span>
                    Episodes:
                    {movieDetail.number_of_episodes}
                  </span>
                </label>
              </div>
              {movieDetail.genres && (
                <div className="genres">
                  <b>Genres</b>:
                  {movieDetail.genres.map((e) => {
                    return (
                      <label
                        key={e.id}
                        className="btn btn-primary btn-sm my-1 mx-2"
                      >
                        {e.name}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
