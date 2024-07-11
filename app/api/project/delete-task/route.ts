import Project from "@/models/project";
import { TaskProps } from "@/types";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const taskId = searchParams.get("taskId");

    if (!projectId || !taskId) {
      return NextResponse.json({
        success: false,
        message: "Missing project id or task id",
      });
    } else {
      const project = await Project.findById(projectId);
      if (project) {
        // Delete task
        const deleteTask = await project.tasks.find(
          (task: TaskProps) => task._id.toString() == taskId
        );
        if (deleteTask) {
          await project.tasks.pull(deleteTask);
          await project.save();
          return NextResponse.json({
            success: true,
            message: "Task delete successfully",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Failed to delete task",
          });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete tasks",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete task",
    });
  }
}
