import mongoose from "mongoose";

export const connectToDB = async () => {
  const url = "url";

  mongoose.connect(url).catch((err) => console.log(err));
};
