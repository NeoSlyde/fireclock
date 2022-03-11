import tasksRep from "./tasks-repository";
var bcrypt = require("bcrypt");

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
  console.log(req.body);
  try {
    const taskBool = await TaskExist(req.body.task_id);
    if (taskBool) {
      res.send({});
    } else {
      const r = await tasksRep.store({
        task_id: req.body.task_id,
        userName: req.body.userName,
        parent: req.body.parent,
        name: req.body.name,
      });
      console.log("pass", r);
      res.send({
        task_id: "ok",
      });
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function deleteTask(task) {
  try {
    const result = await tasksRep.deleteTask(task);
    return result ? true : false;
  } catch (e) {
    console.log("error getting user", e);
    return false;
  }
}

async function TaskExist(task_id) {
  try {
    const result = await tasksRep.getTasks(task_id);
    return result ? true : false;
  } catch (e) {
    console.log("error getting task", e);
    return false;
  }
}

export default {
  getTasks,
  create,
  TaskExist,
};
