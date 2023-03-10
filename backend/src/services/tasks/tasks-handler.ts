import tasksRep from "./tasks-repository";
import { Task } from "../../../../frontend/src/app/tasks/tasks.service";

async function getTasks(req, res) {
  try {
    const result = await tasksRep.getAll();
    const finalArray = [];

    for (let obj of result.hits.hits) {
      finalArray.push(obj._source);
    }

    res.send(finalArray);
  } catch (e) {
    res.status(400).end();
  }
}

async function create(req, res) {
  res.set("Content-Type", "application/json");
  try {
    const r = await tasksRep.store({
      user_id: req.session.userId,
      parent_id: req.body.parentId,
      name: req.body.name,
      quota: req.body.quota,
      quotaInterval: req.body.quotaInterval,
    });
    const task: Task = {
      children: [],
      id: r._id,
      name: req.body.name,
      quota: req.body.quota,
      quotaInterval: req.body.quotaInterval,
    };
    res.send(task);
  } catch (e) {
    res.status(400).end();
  }
}

async function deleteTask(req, res) {
  try {
    const userBool = await taskExist(req.body.taskId);
    if (!userBool) {
      res.status(404).end();
    } else {
      const result = await tasksRep.remove(req.body.taskId);
      res.send(result);
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function updateName(req, res) {
  try {
    const taskBool = await taskExist(req.body.taskId);
    if (taskBool) {
      console.log("attempting to update name");
      const newTask = await tasksRep.updateName(req.body.taskId, req.body.name);
      res.json(newTask);
    }
  } catch (error) {}
}

async function updateQuota(req, res) {
  try {
    const taskBool = await taskExist(req.body.taskId);
    if (taskBool) {
      const newTask = await tasksRep.updateQuota(
        req.body.taskId,
        req.body.quota
      );
      res.json(newTask);
    }
  } catch (error) {}
}

async function updateQuotaInterval(req, res) {
  try {
    const taskBool = await taskExist(req.body.taskId);
    if (taskBool) {
      const newTask = await tasksRep.updateQuotaInterval(
        req.body.taskId,
        req.body.quotaInterval
      );
      res.json(newTask);
    }
  } catch (error) {}
}

async function taskExist(id) {
  try {
    const result = await tasksRep.getTask(id);
    return result ? true : false;
  } catch (e) {
    console.log("error getting task", e);
    return false;
  }
}

async function getTaskOfUser(req, res) {
  try {
    const result = await tasksRep.getTasks(req.session.userId);
    const finalArray = [];
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

export default {
  getTasks,
  create,
  taskExist,
  deleteTask,
  getTaskOfUser,
  updateName,
  updateQuota,
  updateQuotaInterval,
};
