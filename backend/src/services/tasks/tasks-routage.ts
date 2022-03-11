import express from "express";
import tasksHandler from "./tasks-handler";
import asyncHandler from "express-async-handler";

const tasksRouter = express.Router();
let tasks = [];

tasksRouter.get("/", asyncHandler(tasksHandler.getTasks));
tasksRouter.post("/", asyncHandler(tasksHandler.create));

export default tasksRouter;
