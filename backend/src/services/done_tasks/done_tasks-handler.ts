import done_tasksRep from "./done_tasks-repository";
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
    /*

    NOT WORKING :((

    */

    const result = await done_tasksRep.getDoneTasksOfTask(req.params.id);
    const finalArray = [];
    for (let obj of result.hits.hits) {
      finalArray.push(obj._source);
    }
    console.log("azeaeazeazaz " + finalArray);

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
    res.send({
      id: "ok",
    });
  } catch (e) {
    res.status(400).end();
  }
}

async function deleteDoneTask(req, res) {
  try {
    const userBool = await done_taskExist(req.body.taskId);
    if (!userBool) {
      res.status(404).end();
    } else {
      const result = await done_tasksRep.remove(req.params.id);
      res.send(result);
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function done_taskExist(taskId) {
  try {
    const result = await done_tasksRep.getDoneTasksOfTask(taskId);
    return result ? true : false;
  } catch (e) {
    console.log("error getting done_task", e);
    return false;
  }
}

async function updateDuration(req, res) {
  try {
    const taskBool = await done_taskExist(req.body.taskId);
    if (taskBool) {
      console.log("attempting to update name");
      const newTask = await done_tasksRep.updateDuration(
        req.body.taskId,
        req.body.duration
      );
      res.json(newTask);
    }
  } catch (error) {}
}

async function updateCreated(req, res) {
  try {
    const taskBool = await done_taskExist(req.body.taskId);
    if (taskBool) {
      console.log("attempting to update name");
      const newTask = await done_tasksRep.updateCreated(
        req.body.taskId,
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
