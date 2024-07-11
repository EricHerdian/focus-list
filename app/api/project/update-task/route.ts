import Project from "@/models/project";
import { TaskProps } from "@/types";
import { connectToDB } from "@/utils/database";
import Joi from "joi";
import { NextResponse } from "next/server";

const editTask = Joi.object({
  description: Joi.string(),
  type: Joi.string().required(),
});

export async function PUT(req: Request) {
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
        const taskData = await req.json();
        const { description, type } = taskData;

        // Validation
        const { error } = editTask.validate({ type });
        if (error) {
          return NextResponse.json({
            success: false,
            message: error.details[0].message,
          });
        }

        // Update task
        const updateTask = await project.tasks.find(
          (task: TaskProps) => task._id.toString() == taskId
        );
        if (updateTask) {
          updateTask.description = taskData.description;
          updateTask.type = taskData.type;

          await project.save();
          return NextResponse.json({
            success: true,
            message: "Task update successfully",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Failed to update task",
          });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update tasks",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to update task",
    });
  }
}
