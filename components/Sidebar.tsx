"use client";

import { ProjectProps } from "@/types";
import {
  RiAddLine,
  RiArrowRightCircleFill,
  RiArrowRightSLine,
  RiDeleteBinLine,
  RiListUnordered,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

async function fetchListOfProjects() {
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

const Sidebar = () => {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();
  const hideOnPath = ["/", "/home"];

  const addProject = async () => {
    if (!projectName) return; // Handle empty project name

    setIsLoading(true);
    try {
      const apiResponse = await fetch("/api/add-project", {
        method: "POST",
        body: JSON.stringify({ name: projectName }),
      });
      const result = await apiResponse.json();
      console.log(result);
      setProjectName("");
      setIsAddingProject(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirm) {
      setIsLoading(true);
      try {
        const apiResponse = await fetch(
          `/api/delete-project?projectId=${projectId}`,
          {
            method: "DELETE",
          }
        );
        const result = await apiResponse.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hideOnPath.includes(pathName)) {
      const fetchProjects = async () => {
        try {
          const data = await fetchListOfProjects();
          setProjects(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchProjects();
      setIsOpen(false);
    }
  }, [pathName, isLoading]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Hide Sidebar if on Path
  if (hideOnPath.includes(pathName)) {
    return null;
  }

  return (
    <>
      {/* Mobile Sidebar */}
      {!isOpen && (
        <div className="fixed bottom-0 right-0 p-5 mb-5 mr-5 block sm:hidden bg-sidebar-color text-white rounded-full z-30">
          <span onClick={toggleSidebar}>
            <RiListUnordered size={24} />
          </span>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 w-2/3 sm:w-60 h-full bg-sidebar-color transition-all duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:-translate-x-52"
        }`}
      >
        <div className="h-full mt-12 sm:mt-20">
          <div
            onClick={toggleSidebar}
            className={`fixed hidden sm:flex mt-6 pr-2 h-12 w-24 justify-end items-center border-[#8D99AE] border-solid border-2 bg-[#202232] rounded-2xl cursor-pointer transition-transform duration-300 ${
              isOpen ? "-translate-x-24" : "translate-x-40"
            }`}
          >
            <RiArrowRightSLine size={30} className="text-white" />
          </div>

          {/* Sidebar Content */}
          {isOpen && (
            <div className="text-white">
              {/* 
                  TODO: Add Project Title If Params Exist
                */}
              <div className="w-full max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden flex flex-col">
                <div className="p-2 w-full text-2xl font-bold">
                  Project List
                </div>
                <div>
                  {projects.map((project: any) => (
                    <div
                      key={project._id}
                      className="p-2 text-2xl w-full h-full flex flex-row items-center gap-2 hover:bg-[#5A5E88]"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Link href={`/project/${project._id}`}>
                        {project.name}
                      </Link>
                      <span
                        onClick={() =>
                          project?._id && deleteProject(project?._id)
                        }
                        className="absolute right-0 mr-2 "
                      >
                        <RiDeleteBinLine
                          className={`hover:text-sidebar-color ${
                            isHovered ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </span>
                    </div>
                  ))}
                  <div
                    className={`p-2 w-full flex flex-row items-center gap-2 text-2xl bg-[#5A5E88] transition-all duration-300 ${
                      isAddingProject
                        ? "translate-x-0"
                        : "absolute -translate-x-full sm:-translate-x-60"
                    }`}
                  >
                    <input
                      type="text"
                      value={projectName}
                      placeholder="Project Name"
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-[#5A5E88] focus:outline-none"
                    />
                    <span onClick={addProject}>
                      <RiArrowRightCircleFill
                        size={32}
                        className="text-sidebar-color cursor-pointer transition-all duration-300 hover:text-white"
                      />
                    </span>
                  </div>
                  <div className="p-2 text-2xl w-full h-full">
                    <div className="w-full flex justify-center items-center">
                      <div
                        onClick={() => {
                          setIsAddingProject(!isAddingProject);
                          setProjectName("");
                        }}
                        className={`w-10 h-10 flex justify-center items-center  rounded-full cursor-pointer transition-all duration-300 ${
                          isAddingProject
                            ? "rotate-45 bg-red-500"
                            : "bg-[#5A5E88]"
                        }`}
                      >
                        <RiAddLine size={30} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay Sidebar */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full min-h-full bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
