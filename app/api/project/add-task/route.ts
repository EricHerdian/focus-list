import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewTask = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  date: Joi.date().required(),
  type: Joi.string().required(),
});

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json({
        success: false,
        message: "Missing project id",
      });
    } else {
      const project = await Project.findById(projectId);
      if (project) {
        const taskData = await req.json();
        const { title, description, date, type } = taskData;

        // Validation
        const { error } = AddNewTask.validate({ title, date, type });
        if (error) {
          return NextResponse.json({
            success: false,
            message: error.details[0].message,
          });
        }

        // Add task
        const newTask = await project.tasks.push(taskData);
        if (newTask) {
          await project.save();
          return NextResponse.json({
            success: true,
            message: "Task added successfully",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Failed to add task",
          });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get tasks",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
