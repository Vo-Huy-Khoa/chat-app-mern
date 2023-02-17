import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connect = async () => {
  const url = process.env.MONGO_URL || "";
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
