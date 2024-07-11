import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  type: String,
});

const ProjectSchema = new Schema({
  name: String,
  tasks: [TaskSchema],
});

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
