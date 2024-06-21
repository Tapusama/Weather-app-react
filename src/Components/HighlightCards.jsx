import React, { memo } from "react";

const Highlights = memo((props) => {
  const { styles, title, footer, image, icon, value, unit, jsx } = props;
  return (
    <div
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
      <span
        style={{
          color: "#eaeaea",
          alignSelf: "flex-start",
          fontSize: "12px",
          fontWeight: "bold",
          height: "15%",
        }}
      >
        {title}
      </span>

      <div style={{ height: "80px", alignSelf: "flex-start" }}>
        {image ? (
          <img
            style={{ height: "50px", width: "50px", marginTop: "10px" }}
            src={image}
          />
        ) : value ? (
          <div
            className="highlightValueDiv"
            style={{ paddingBottom: "10px", paddingTop: "20px" }}
          >
            <span>{value}</span>
            <span>{unit}</span>
          </div>
        ) : jsx ? (
          jsx
        ) : (
          <></>
        )}
      </div>

      <span style={{ alignSelf: "flex-start" }}>
        <span>{footer ?? footer}</span>
        <span>{icon ?? icon}</span>
      </span>
    </div>
  );
});

export default Highlights;
