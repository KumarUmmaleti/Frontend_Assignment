import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = ({
  loaderSize = 80,
  loaderColor = "#4fa94d",
  loadingText = "Loading",
  displayCircles = true,
  circlesSize = 100,
  circlesColor = "#4fa94d",
  messageColor = "green",
  additionalStyles = {},
}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {displayCircles && (
        <ThreeCircles
          height={circlesSize}
          width={circlesSize}
          color={circlesColor}
          visible={true}
          ariaLabel="three-circles-rotating"
        />
      )}
      <span
        style={{
          fontSize: "30px",
          color: messageColor,
          fontWeight: "bold",
          letterSpacing: "2px",
          ...additionalStyles,
        }}
      >
        {loadingText}
      </span>
    </div>
  );
};

export default Loader;
