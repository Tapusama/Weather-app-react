import React, { memo } from "react";

const SmallCards = memo((props, { children }) => {
  const { classNames, data } = props;
  return (
    <div className={classNames ? classNames : "Wrapper"}>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span>{data?.day}</span>
          <img style={{ height: "50px", width: "50px" }} src={data?.image} />
          <span>
            {data?.temp}- <span style={{ color: "#eaeaea" }}>{data?.low}</span>
          </span>
        </div>
      ) : children ? (
        children
      ) : (
        <></>
      )}
    </div>
  );
});

export default SmallCards;
