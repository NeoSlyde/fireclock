import express from "express";
import usersHandler from "./users-handler";
import asyncHandler from "express-async-handler";

const usersRouter = express.Router();
let users = [];

usersRouter.get("/", asyncHandler(usersHandler.getUsers));
usersRouter.post("/", asyncHandler(usersHandler.create));

export default usersRouter;
