import React from "react";

function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-10">
      <h3 className="flex flex-col gap-1 text-lg font-semibold leading-none tracking-tight text-center">
        <span>Uh oh...</span>
        <span>We lost that page it seems </span>
        <span>🙈</span>
      </h3>
    </div>
  );
}

export default NotFound;
