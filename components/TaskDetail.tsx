import { RiCloseFill, RiListCheck, RiPencilFill } from "@remixicon/react";
import React, { useEffect, useRef } from "react";

interface TaskDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  task: string;
}

const TaskDetail = ({ isOpen, closeModal, task }: TaskDetailsProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div
            ref={modalRef}
            className="relative w-full max-w-xl bg-[#323640] px-6 py-6 rounded-md"
          >
            <button className="absolute top-0 right-0 text-white px-3 py-3">
              <RiCloseFill size={32} onClick={closeModal} />
            </button>
            <div className="mb-4">
              <div className="text-white flex flex-row items-center text-xl">
                <RiListCheck size={32} className="mr-2" />
                <p>{task}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-white flex flex-row items-center text-xl mb-4">
                <RiPencilFill size={32} className="mr-2" />
                <p>Description</p>
              </div>
              <textarea
                name="desc"
                id="desc"
                className="text-white bg-[#4D515C] mx-0 sm:mx-4 px-5 py-2 rounded-md focus:outline-none"
                placeholder="Add a description..."
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskDetail;
