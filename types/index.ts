import { ObjectId } from "mongoose";

export interface ProjectProps {
  _id: ObjectId;
  name: string;
  tasks: TaskProps[];
}

export interface TaskProps {
  _id: ObjectId;
  title: string;
  description: string;
  date: Date;
  type: string;
}

export interface TaskBoxProps {
  task?: TaskProps;
  type: string;
  fetchSetTasks: () => void;
}
