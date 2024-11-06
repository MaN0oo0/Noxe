import React from "react";

export default function People() {
  const [people, setPeople] = React.useState([]);
  const url = "https://api.themoviedb.org/3/trending/person/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzFiZmE3NTIxZTIxZmUxMGU0MjA2YTg2ODA4MmFlMiIsIm5iZiI6MTczMDcyODE0Mi40NDk3NzM2LCJzdWIiOiI2NTYwN2UwYjM2NzlhMTA5NzY0Njc0MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qFjcV7YUIzQTEsx3EruWYBV-N3sFisnJ49WFBaSniEY",
    },
  };
  const loadData = () => {
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        setPeople(e.results);
        console.log(e);
      });
  };
  loadData()
  return (
    <>
      {people.map((person) => {
        return <p>{person.name}</p>;
      })}
    </>
  );
}
