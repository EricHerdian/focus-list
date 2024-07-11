import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
      const getTasks = await Project.findById(projectId);
      if (getTasks) {
        return NextResponse.json({
          success: true,
          projectName: getTasks.name,
          tasks: getTasks.tasks,
        });
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
      message: "Failed to get tasks",
    });
  }
}
