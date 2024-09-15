import mongoose from "mongoose";

function db() {
  mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
      console.log("MongoDB connected 👌");
    })
    .catch((error) => {
      console.log(`Error connecting with MongoDB: ${error}`);
    });
}

export default db;
