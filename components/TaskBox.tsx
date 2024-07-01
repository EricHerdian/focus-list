"use client";

import { TaskBoxProps } from "@/types";
import { RiArrowRightFill, RiSettings2Line } from "@remixicon/react";
import React, { useState } from "react";
import TaskDetail from "./TaskDetail";

const TaskBox = ({ title, type }: TaskBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeTaskDetail = () => {
    setIsOpen(false);
    setIsHovered(false); // Reset hover state when TaskDetail is closed
  };

  return (
    <>
      {type === "task" ? (
        <div
          className="relative w-full h-auto bg-task-color flex flex-col justify-center px-5 py-2 my-2 rounded-lg transition-all duration-300 hover:shadow-inner-border"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-lg text-white">{title}</div>
          <div
            className={`absolute h-full w-auto right-0 bg-[#515369] flex justify-between items-center px-2 rounded-br-lg rounded-tr-lg transition-all duration-300 ${
              isHovered ? " opacity-100" : "opacity-0"
            } hover: border-4 border-l-0 border-primary-color`}
          >
            <button onClick={() => setIsOpen(true)}>
              <RiSettings2Line
                size={24}
                className="text-white hover:text-primary-color"
              />
            </button>
            <div className="border-l-2 border-[#5B5E79] h-3/4 mx-2" />
            <button>
              <RiArrowRightFill
                size={24}
                className="text-white hover:text-primary-color"
              />
            </button>

            <TaskDetail
              isOpen={isOpen}
              closeModal={closeTaskDetail}
              task={title}
            />
          </div>
        </div>
      ) : (
        <button
          className="relative w-full h-auto bg-task-color flex flex-col justify-center px-5 py-2 my-2 rounded-lg transition-all duration-300 hover:shadow-inner-border"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-lg text-white">{title}</div>
        </button>
      )}
    </>
  );
};

export default TaskBox;
