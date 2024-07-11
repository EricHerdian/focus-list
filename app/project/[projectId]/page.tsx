"use client";

import TaskBox from "@/components/TaskBox";
import { ProjectProps, TaskProps } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

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

const ProjectDetail = () => {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [projectExist, setProjectExist] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetchListOfProjects();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  async function fetchListOfTasks() {
    try {
      const apiResponse = await fetch(
        `/api/project/get-task?projectId=${params.projectId}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const result = await apiResponse.json();

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const fetchTasks = useCallback(async () => {
    try {
      const data = await fetchListOfTasks();
      if (data?.success === true) {
        setProjectName(data?.projectName);
        if (data?.tasks === undefined) setTasks([]);
        else setTasks(data?.tasks);
      } else setProjectExist(false); //Project does not exist
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!projectExist) {
      router.push("/not-found");
    }
  }, [projectExist]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main className="h-full bg-secondary-color">
      <div className="px-8 sm:px-16 py-5">
        <div className="text-2xl font-bold">
          {projectName || "Project Name"}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 px-2 py-5">
          <div className="w-full">
            <div className="text-2xl">To Do</div>
            <hr className="border-black border-2 mb-2" />
            {tasks
              .filter((task: TaskProps) => task.type === "todo")
              .map((task: TaskProps) => (
                <TaskBox
                  key={task?._id.toString()}
                  task={task}
                  type="task"
                  fetchSetTasks={fetchTasks}
                />
              ))}
            <TaskBox type="add" fetchSetTasks={fetchTasks} />
          </div>
          <div className="w-full">
            <div className="text-2xl">Doing</div>
            <hr className="border-black border-2 mb-2" />
            {tasks
              .filter((task: TaskProps) => task.type === "doing")
              .map((task: TaskProps) => (
                <TaskBox
                  key={task?._id.toString()}
                  task={task}
                  type="task"
                  fetchSetTasks={fetchTasks}
                />
              ))}
          </div>
          <div className="w-full">
            <div className="text-2xl">Done</div>
            <hr className="border-black border-2 mb-2" />
            {tasks
              .filter((task: TaskProps) => task.type === "done")
              .map((task: TaskProps) => (
                <TaskBox
                  key={task?._id.toString()}
                  task={task}
                  type="task"
                  fetchSetTasks={fetchTasks}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
