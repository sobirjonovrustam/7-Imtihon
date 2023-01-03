import express from "express";
import fileUpload from "express-fileupload";
import { PORT } from "./config.js";
import eventRouter from "./routers/event.router.js";
import userRouter from "./routers/user.router.js";
import swaggerRouter from "./swagger.js";

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use("/api-docs", swaggerRouter);
app.use(userRouter);
app.use(eventRouter);

app.use((error, req, res, next) => {
  console.log(error.message);
});

app.listen(PORT, console.log(`server started ${PORT}`));
