"use client";

import { ProjectProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

async function fetchListOfProjects(): Promise<ProjectProps[]> {
  try {
    const apiResponse = await fetch("/api/get-project", {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiResponse.json();

    return result?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const Home = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const createProject = async () => {
    try {
      const apiResponse = await fetch("/api/add-project", {
        method: "POST",
        body: JSON.stringify({ name: projectName }),
      });
      const result = await apiResponse.json();
      console.log(result);
      setProjectName("");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await fetchListOfProjects();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const projectCreateOrPass = () => {
    if (projects.length === 0 && isOpen) {
      return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10">
          <div className="flex justify-center items-center w-full h-full z-20">
            <div
              ref={modalRef}
              className="w-1/3 h-1/2 flex flex-col justify-center items-center bg-primary-color rounded shadow-black shadow-md"
            >
              <h2 className="mb:4 sm:mb-6 text-2xl sm:text-3xl font-semibold text-white">
                Create Project
              </h2>
              <input
                type="text"
                placeholder="Project Name"
                onChange={(e) => setProjectName(e.target.value)}
                className="p-2 mb:4 sm:mb-6 text-center rounded focus:outline-none"
              />
              <button
                onClick={createProject}
                className="px-7 sm:px-10 py-2 bg-secondary-color text-lg text-black rounded transition-all duration-300 hover:text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (projects.length > 0 && isOpen) {
      router.push(`/project/${projects[0]?._id}/`);
    }
  }, [isOpen]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    // px-16 with sidebar, 8 with no sidebar
    // <main className="px-6 sm:px-8 py-5">
    // </main>

    <div className="absolute top-0 left-0 w-screen h-screen bg-white">
      <Image
        src="/background.jpeg"
        alt="background"
        fill
        className="opacity-60 object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-black">
        <h2 className="mb-4 sm:mb-8 text-4xl font-bold">Focus-List</h2>
        <p className="w-3/4 sm:w-1/2 mb-4 sm:mb-8 text-justify text-lg font-semibold">
          Focus-List is a Kanban-inspired application designed to streamline
          project management by organizing tasks into customizable boards.
          Whether you're managing personal projects or collaborating with a
          team, Focus-List helps you visualize tasks and track progress
          effectively.
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-14 sm:px-20 py-3 bg-secondary-color text-lg text-black rounded transition-all duration-300 hover:bg-primary-color hover:text-white"
        >
          Get Started
        </button>
        {projectCreateOrPass()}
      </div>
    </div>
  );
};

export default Home;
