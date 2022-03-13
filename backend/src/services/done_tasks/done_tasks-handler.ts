import done_tasksRep from "./done_tasks-repository";
import { Activity } from "../../../../frontend/src/app/activities/activity.service";
var bcrypt = require("bcrypt");

async function getDone_tasks(req, res) {
  try {
    const result = await done_tasksRep.getAll();
    const finalArray = [];

    for (let obj of result.hits.hits) {
      finalArray.push(obj._source);
    }

    res.send(finalArray);
  } catch (e) {
    res.status(400).end();
  }
}

async function getDoneTasksOfTask(req, res) {
  try {
    const result = await done_tasksRep.getDoneTasksOfTask(req.query.id);
    const finalArray: Activity[] = [];
    for (let obj of result.hits.hits) {
      finalArray.push({
        ...obj._source,
        id: obj._id,
      });
    }
    res.send(finalArray);
  } catch (e) {
    res.status(400).end();
  }
}

async function create(req, res) {
  res.set("Content-Type", "application/json");
  try {
    const r = await done_tasksRep.store({
      taskId: req.body.taskId,
      duration: req.body.duration,
      created: req.body.created,
    });
    const task: Activity = {
      id: r._id,
      taskId: req.body.taskId,
      duration: req.body.duration,
      created: req.body.created,
    };
    res.send(task);
  } catch (e) {
    res.status(400).end();
  }
}

async function deleteDoneTask(req, res) {
  try {
    const result = await done_tasksRep.remove(req.body.activityId);
    res.send(result);
  } catch (e) {
    res.status(400).end();
  }
}

async function done_taskExist(activityId) {
  try {
    const result = await done_tasksRep.getDoneTasksOfTask(activityId);
    return result ? true : false;
  } catch (e) {
    console.log("error getting done_task", e);
    return false;
  }
}

async function updateDuration(req, res) {
  try {
    const taskBool = await done_taskExist(req.body.activityId);
    if (taskBool) {
      console.log("attempting to update name");
      const newTask = await done_tasksRep.updateDuration(
        req.body.activityId,
        req.body.duration
      );
      res.json(newTask);
    }
  } catch (error) {}
}

async function updateCreated(req, res) {
  try {
    const taskBool = await done_taskExist(req.body.activityId);
    if (taskBool) {
      console.log("attempting to update name");
      const newTask = await done_tasksRep.updateCreated(
        req.body.activityId,
        req.body.created
      );
      res.json(newTask);
    }
  } catch (error) {}
}

export default {
  getDone_tasks,
  create,
  done_taskExist,
  deleteDoneTask,
  updateDuration,
  updateCreated,
  getDoneTasksOfTask,
};
