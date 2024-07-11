import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
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
      const deleteProject = await Project.findByIdAndDelete(projectId);
      if (deleteProject) {
        return NextResponse.json({
          success: true,
          message: "Project deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete project",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete project",
    });
  }
}
