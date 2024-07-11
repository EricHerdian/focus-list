import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProject = Joi.object({
  name: Joi.string().required(),
});

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const { name } = data;

    // Validation
    const { error } = AddNewProject.validate({ name });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Create new task
    const newProject = await Project.create(data);
    if (newProject) {
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
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
