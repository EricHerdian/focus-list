import React from "react";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <nav className="mx-auto flex justify-between items-center px-4 lg:px-10 py-3 lg:py-5 bg-primary-color">
        <span className="text-xl lg:text-3xl text-white">FOCUS-LIST</span>
      </nav>
    </header>
  );
};

export default Navbar;
