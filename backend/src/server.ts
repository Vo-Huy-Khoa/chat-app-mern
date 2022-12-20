import express from "express";
import connect from "./configs/db";
import dotenv from "dotenv";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || "3001";
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
connect();

app.listen(PORT, () => {
  console.log(`Server listing at port: ${PORT}`);
});
