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
        done_taskName: req.body.done_taskName,
        hashed_password: encryptPassword(req.body.password),
      });
      res.send({
        done_taskName: "ok",
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

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
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
