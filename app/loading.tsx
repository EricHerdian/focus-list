import React from "react";

const loading = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center gap-5">
      <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-gray-900"></div>
      <p className="text-3xl">Loading...</p>
    </div>
  );
};

export default loading;
