import express from "express";
import tasksHandler from "./tasks-handler";
import asyncHandler from "express-async-handler";

const tasksRouter = express.Router();
let tasks = [];

tasksRouter.get("/task-list", asyncHandler(tasksHandler.getTaskOfUser));
tasksRouter.post("/new-task", asyncHandler(tasksHandler.create));
tasksRouter.post("/delete-task", asyncHandler(tasksHandler.deleteTask));
tasksRouter.post("/update-task", asyncHandler(tasksHandler.updateName));
tasksRouter.post(
  "/update-task-children",
  asyncHandler(tasksHandler.updateChildren)
);
tasksRouter.post("/update-task-quota", asyncHandler(tasksHandler.updateQuota));
tasksRouter.post(
  "/update-task-quotaInterval",
  asyncHandler(tasksHandler.updateQuotaInterval)
);

export default tasksRouter;
