import tasksRep from "./tasks-repository";

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
        id: req.body.id,
        children: req.body.children,
        name: req.body.name,
        quotaInterval: req.body.quotaInterval,
      });
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
    const result = await tasksRep.remove(task);
    return result ? true : false;
  } catch (e) {
    console.log("error getting user", e);
    return false;
  }
}

async function TaskExist(id) {
  try {
    const result = await tasksRep.getTasks(id);
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
  deleteTask,
};
