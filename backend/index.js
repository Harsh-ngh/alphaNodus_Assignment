import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import addJobsRoute from './routes/addJobsRouter.js';
import testRoute from "./routes/testDBConnectionRouter.js";
import getJobsRoute from "./routes/getJobsRouter.js";  

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
  res.send("Hello from AlphaNodus Backend!");
});

// routes
app.use("/alphanodus", addJobsRoute);
app.use("/alphanodus", testRoute);
app.use("/alphanodus", getJobsRoute);    

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
