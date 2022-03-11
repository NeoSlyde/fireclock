import express from "express";
import quotaHandler from "./quota-handler";
import asyncHandler from "express-async-handler";

const quotaRouter = express.Router();
let quota = [];

quotaRouter.get("/", asyncHandler(quotaHandler.getQuota));
quotaRouter.post("/", asyncHandler(quotaHandler.create));

export default quotaRouter;
