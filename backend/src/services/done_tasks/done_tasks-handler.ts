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

async function create(req, res) {
  res.set("Content-Type", "application/json");
  try {
    const done_taskBool = await done_taskExist(req.body.done_taskName);
    if (done_taskBool) {
      res.send({});
    } else {
      const r = await done_tasksRep.store({
        id: req.body.id,
        task_id: req.body.task_id,
        duration: req.body.duration,
        created: req.body.created,
      });
      res.send({
        id: "ok",
      });
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function deleteDoneTask(done_tasks) {
  try {
    const result = await done_tasks.deleteDoneTask(done_tasks);
    return result ? true : false;
  } catch (e) {
    console.log("error getting done_task", e);
    return false;
  }
}

async function done_taskExist(done_taskName) {
  try {
    const result = await done_tasksRep.getDoneTasks(done_taskName);
    return result ? true : false;
  } catch (e) {
    console.log("error getting done_task", e);
    return false;
  }
}

export default {
  getDone_tasks,
  create,
  done_taskExist,
};
