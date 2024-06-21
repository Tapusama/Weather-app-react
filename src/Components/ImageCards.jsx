import React, { memo } from "react";

const ImageCards = memo(({ children }, props) => {
  return (
      <img
        className="imageCards"
        src={require("../weatherImages/x.avif")}
      />
  );
});

export default ImageCards;
