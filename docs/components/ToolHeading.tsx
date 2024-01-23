import React from "react";

function ToolHeading({ title, icon }: { title: string; icon: string }) {
  const headingContainer = {
    display: "flex",
    flexDirection: "row" as "row",
    gap: 20,
    paddingTop: 10,
  };

  const textStyle = {
    fontWeight: "bold",
    fontSize: "1.3em",
    marginLeft: "-4px",
  };

  return (
    <>
      <br />
      <div style={headingContainer}>
        <img
          src={`https://skillicons.dev/icons?i=${icon}`}
          alt={title}
          width={35}
        />
        <p style={textStyle}>{title}</p>
      </div>
    </>
  );
}

export default ToolHeading;
