import express from "express";
import db from "./config/db.js";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"

const app = express();
const PORT = 4000;

app.use(express.json());


app.use(cors());

//Routes

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
