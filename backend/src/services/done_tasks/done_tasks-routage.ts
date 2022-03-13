import express from "express";
import done_taskHandler from "./done_tasks-handler";
import asyncHandler from "express-async-handler";

const done_taskRouter = express.Router();
let done_task = [];

done_taskRouter.get(
  "/list-activities",
  asyncHandler(done_taskHandler.getDoneTasksOfTask)
);
done_taskRouter.post("/new-activity", asyncHandler(done_taskHandler.create));
done_taskRouter.post(
  "/delete-activity",
  asyncHandler(done_taskHandler.deleteDoneTask)
);
done_taskRouter.post(
  "/update-duration-activity",
  asyncHandler(done_taskHandler.updateDuration)
);
done_taskRouter.post(
  "/update-created-activity",
  asyncHandler(done_taskHandler.updateCreated)
);
export default done_taskRouter;
