import React, { useContext } from "react";
import RenderMovies from "../../AssetsComponents/RenderMovies/RenderMovies";

import { mediaContext } from "../../Context/MediaStore";

export default function People() {
  let { people } = useContext(mediaContext);

  return (
    <>
      <RenderMovies data={people} title={"people"} />
    </>
  );
}
