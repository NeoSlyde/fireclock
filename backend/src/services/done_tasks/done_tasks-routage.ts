import express from "express";
import done_taskHandler from "./done_tasks-handler";
import asyncHandler from "express-async-handler";

const done_taskRouter = express.Router();
let done_task = [];

done_taskRouter.get("/", asyncHandler(done_taskHandler.getDone_tasks));
done_taskRouter.post("/", asyncHandler(done_taskHandler.create));

export default done_taskRouter;
