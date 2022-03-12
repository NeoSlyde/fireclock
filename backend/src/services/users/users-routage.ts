import express from "express";
import usersHandler from "./users-handler";
import asyncHandler from "express-async-handler";

const usersRouter = express.Router();
let users = [];

usersRouter.get("/user-list", asyncHandler(usersHandler.getUsers));
usersRouter.post("/register", asyncHandler(usersHandler.create));
usersRouter.post("/login", asyncHandler(usersHandler.login));

export default usersRouter;
