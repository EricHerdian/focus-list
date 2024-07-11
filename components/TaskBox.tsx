"use client";

import { TaskBoxProps } from "@/types";
import {
  RiArrowRightFill,
  RiDeleteBinLine,
  RiSettings2Line,
} from "@remixicon/react";
import React, { useState } from "react";
import TaskDetail from "./TaskDetail";
import { ObjectId } from "mongoose";
import { useParams } from "next/navigation";

const TaskBox = ({ task, type, fetchSetTasks }: TaskBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const closeTaskDetail = () => {
    setIsOpen(false);
    setIsHovered(false); // Reset hover state when TaskDetail is closed
  };

  const deleteTask = async (currentTaskId: ObjectId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirm) {
      try {
        const apiResponse = await fetch(
          `/api/project/delete-task?projectId=${params.projectId}&taskId=${currentTaskId}`,
          {
            method: "DELETE",
          }
        );
        const result = await apiResponse.json();

        if (result?.success) {
          console.log("Task deleted successfully");
          fetchSetTasks();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const moveTask = async (getCurrentID: ObjectId) => {
    const confirm = window.confirm(
      "Move the task? This action cannot be undone."
    );
    if (confirm) {
      try {
        const nextType = task?.type === "todo" ? "doing" : "done";
        const apiResponse = await fetch(
          `/api/project/update-task?projectId=${params.projectId}&taskId=${getCurrentID}`,
          {
            method: "PUT",
            body: JSON.stringify({
              description: task?.description,
              type: nextType,
            }),
          }
        );
        const result = await apiResponse.json();

        if (result?.success) {
          console.log("Task moved successfully");
          fetchSetTasks();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {type === "task" ? (
        // Task detail || Edit task
        <div
          className="relative w-full h-auto bg-task-color flex flex-col justify-center px-5 py-2 my-2 rounded-lg transition-all duration-300 hover:shadow-inner-border"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-lg text-white break-words">{task?.title}</div>
          <div
            className={`absolute h-full w-auto right-0 bg-[#515369] flex justify-between items-center px-2 rounded-br-lg rounded-tr-lg transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            } hover: border-4 border-l-0 border-primary-color`}
          >
            {/* Delete Button */}
            <span onClick={() => task?._id && deleteTask(task?._id)}>
              <RiDeleteBinLine
                size={24}
                className="text-white hover:text-primary-color"
              />
            </span>
            {/* Settings Button */}
            <div className="border-l-2 border-[#5B5E79] h-3/4 mx-2" />
            <span onClick={() => setIsOpen(true)}>
              <RiSettings2Line
                size={24}
                className="text-white hover:text-primary-color"
              />
            </span>
            {/* Move Task Button */}
            {!(task?.type === "done") && (
              <>
                <div className="border-l-2 border-[#5B5E79] h-3/4 mx-2" />
                <span onClick={() => task?._id && moveTask(task?._id)}>
                  <RiArrowRightFill
                    size={24}
                    className="text-white hover:text-primary-color"
                  />
                </span>
              </>
            )}

            <TaskDetail
              isOpen={isOpen}
              closeModal={closeTaskDetail}
              loading={loading}
              setLoading={setLoading}
              task={task}
              type="edit"
              fetchSetTasks={fetchSetTasks}
            />
          </div>
        </div>
      ) : (
        // Add a task button
        <div
          className="relative w-full h-auto bg-task-color flex flex-col justify-center px-5 py-2 my-2 rounded-lg transition-all duration-300 hover:shadow-inner-border cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen(true)}
        >
          <div className="text-lg text-white">+ Add a task</div>
          <TaskDetail
            isOpen={isOpen}
            closeModal={closeTaskDetail}
            loading={loading}
            setLoading={setLoading}
            type="add"
            fetchSetTasks={fetchSetTasks}
          />
        </div>
      )}
    </>
  );
};

export default TaskBox;
