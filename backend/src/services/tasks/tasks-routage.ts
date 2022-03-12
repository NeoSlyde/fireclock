import express from "express";
import tasksHandler from "./tasks-handler";
import asyncHandler from "express-async-handler";

const tasksRouter = express.Router();
let tasks = [];

tasksRouter.get("/task-list", asyncHandler(tasksHandler.getTaskOfUser));
tasksRouter.post("/new-task", asyncHandler(tasksHandler.create));
tasksRouter.post("/delete-task", tasksHandler.deleteTask);

export default tasksRouter;
