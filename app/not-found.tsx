import { RiHome8Line } from "@remixicon/react";
import Link from "next/link";
import React from "react";

const CustomNotFound = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">
        404 - Page Not Found
      </h1>
      <p className="px-2 sm:px-0 text-lg text-center mb-4">
        The page you are looking for does not exist.
      </p>
      <div>
        <Link
          href="/home"
          className="px-4 py-2 flex flex-row gap-2 bg-primary-color text-white rounded shadow-black shadow-sm"
        >
          <RiHome8Line />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default CustomNotFound;
