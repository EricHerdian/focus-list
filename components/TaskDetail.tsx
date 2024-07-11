"use client";

import { TaskProps } from "@/types";
import { RiCloseFill, RiListCheck, RiPencilFill } from "@remixicon/react";
import { ObjectId } from "mongoose";
import { useParams } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";

interface TaskDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  task?: TaskProps;
  type: string;
  fetchSetTasks: () => void;
}

const initialTaskData = {
  title: "",
  description: "",
  date: new Date(),
  type: "todo",
};

const TaskDetail = ({
  isOpen,
  closeModal,
  loading,
  setLoading,
  task,
  type,
  fetchSetTasks,
}: TaskDetailsProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [taskData, setTaskData] = useState(initialTaskData);
  const params = useParams();

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title,
        description: task.description,
        date: task.date,
        type: task.type,
      });
    }

    if (!isOpen) {
      setTaskData(initialTaskData);
    }
  }, [isOpen]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTaskData(initialTaskData);
    closeModal();
  };

  const saveData = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `/api/project/add-task?projectId=${params.projectId}`,
        {
          method: "POST",
          body: JSON.stringify({
            title: taskData.title,
            description: taskData.description,
            date: Date.now(),
            type: taskData.type,
          }),
        }
      );
      const result = await apiResponse.json();
      console.log(result);

      setTaskData(initialTaskData);
      closeModal();
      fetchSetTasks();
    } catch (error) {
      console.log(error);
      setTaskData(initialTaskData);
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (currentTaskId: ObjectId) => {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `/api/project/update-task?projectId=${params.projectId}&taskId=${currentTaskId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            description: taskData.description,
            type: taskData.type,
          }),
        }
      );
      const result = await apiResponse.json();
      console.log(result);
      setTaskData(initialTaskData);
      closeModal();
      fetchSetTasks();
    } catch (error) {
      console.log(error);
      setTaskData(initialTaskData);
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <Fragment>
      {/* Add new task */}
      {isOpen && type === "add" && (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center cursor-default z-40">
          <div
            ref={modalRef}
            className="relative w-full max-w-sm sm:max-w-xl px-6 py-6 bg-[#323640] text-white text-lg sm:text-xl rounded-md"
          >
            {/* Close */}
            <span className="absolute top-0 right-0 px-3 py-3 cursor-pointer">
              <RiCloseFill
                size={32}
                onClick={(e) => {
                  handleClose(e);
                }}
              />
            </span>

            {/* Title */}
            <div className="mb-6">
              <div className="flex flex-row items-center gap-2">
                <RiListCheck size={32} />
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={taskData.title}
                  placeholder="Add a title..."
                  onChange={(e) => {
                    setTaskData({ ...taskData, title: e.target.value });
                  }}
                  className="w-2/3 bg-[#4D515C] px-5 py-2 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <RiPencilFill size={32} />
                  <p>Description</p>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={taskData.description}
                  placeholder="Add a description..."
                  onChange={(e) => {
                    setTaskData({ ...taskData, description: e.target.value });
                  }}
                  className="bg-[#4D515C] resize-none h-52 w-auto ml-10 px-5 py-2 rounded-md focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center cursor-pointer">
              <button
                className="px-16 py-3 bg-task-color rounded-md transition-all duration-300 hover:shadow-inner-border"
                onClick={() => saveData()}
                disabled={loading}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit task */}
      {isOpen && type === "edit" && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center cursor-default z-40">
          <div
            ref={modalRef}
            className="relative w-full max-w-sm sm:max-w-xl px-6 py-6 bg-[#323640] text-white text-lg sm:text-xl rounded-md"
          >
            {/* Close */}
            <button className="absolute top-0 right-0 px-3 py-3">
              <RiCloseFill
                size={32}
                onClick={(e) => {
                  handleClose(e);
                }}
              />
            </button>

            {/* Title */}
            <div className="mb-6">
              <div className="flex flex-row items-center gap-2">
                <RiListCheck size={32} />
                <div className="w-2/3 break-words">{task?.title}</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <RiPencilFill size={32} />
                  <p>Description</p>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={taskData.description}
                  placeholder="Add a description..."
                  onChange={(e) => {
                    setTaskData({ ...taskData, description: e.target.value });
                  }}
                  className="bg-[#4D515C] resize-none h-52 w-auto ml-10 px-5 py-2 rounded-md focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={() => task?._id && updateData(task?._id)}
                disabled={loading}
                className="px-16 py-3 bg-task-color rounded-md transition-all duration-300 hover:shadow-inner-border"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default TaskDetail;
