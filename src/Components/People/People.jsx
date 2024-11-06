import React, { useEffect } from "react";
import RenderMovies from "../../AssetsComponents/RenderMovies/RenderMovies";
import axios from "axios";

export default function People() {
  const [people, setPeople] = React.useState([]);

  const loadData = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/day?api_key=c636ed7787cc302d96bf88ccf334e0d8"
    );
    setPeople(data.results);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <RenderMovies data={people} title={"people"} />
    </>
  );
}
