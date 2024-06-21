import React, { memo } from "react";

const SmallCards = memo((props, { children }) => {
  const { styles, data } = props;
  return (
    <div
    className="Wrapper"
      style={
        styles
          ? styles
          : {
              height: "100px",
              width: "80px",
              justifyContent: "center",
              borderRadius: "15px",
              borderColor: "#eaeaea",
              background: "#fff",
              padding: "10px",
              fontSize: "10px",
              fontWeight: "bold",
            }
      }
    >
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
