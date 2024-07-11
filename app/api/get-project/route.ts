import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const extractAllData = await Project.find({});

    if (extractAllData) {
      return NextResponse.json({
        success: true,
        data: extractAllData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to get projects",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get projects",
    });
  }
}
