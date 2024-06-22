import React, { memo } from "react";

const ImageCards = memo((props) => {
  const { location } = props;
  console.log(location);
  return (
    <React.Fragment>
      <img className="imageCards" src={require("../weatherImages/x.avif")} />
      <span className="location">{location}</span>
    </React.Fragment>
  );
});

export default ImageCards;
