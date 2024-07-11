import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <nav className="mx-auto flex justify-between items-center px-4 sm:px-10 py-[10px] sm:py-[22px] bg-primary-color">
        <span className="text-xl sm:text-3xl text-white">FOCUS-LIST</span>
      </nav>
    </header>
  );
};

export default Navbar;
