import mongoose from "mongoose";

const connect = async () => {
  const url = process.env.MONGO_URL || "";

  console.log(url);
  
  return await mongoose
    .connect(url)
    .then(() => {
      console.log("Database connect successfully");
    })
    .catch(() => {
      console.log("Database connect fail");
    });
};

export default connect;
