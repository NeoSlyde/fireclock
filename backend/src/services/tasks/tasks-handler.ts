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
  try {
    const taskBool = await taskExist(req.body.task_id);
    if (taskBool) {
      res.send({});
    } else {
      const r = await tasksRep.store({
        user_id: req.body.user_id,
        parent_id: req.body.parent_id,
        children: req.body.children,
        name: req.body.name,
        quota: req.body.quota,
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

async function deleteTask(req, res) {
  try {
    const userBool = await taskExist(req.params.id);
    if (!userBool) {
      res.status(404).end();
    } else {
      const result = await tasksRep.remove(req.params.id);
      res.send(result);
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function updateName(req, res) {
  try {
    const taskBool = await taskExist(req.body.task_id);
    if (taskBool) {
      const newTask = await tasksRep.updateName(
        req.body.task_id,
        req.body.value
      );
      res.json(newTask);
    }
  } catch (error) {}
}

async function updateQuota(req, res) {
  try {
    const taskBool = await taskExist(req.body.task_id);
    if (taskBool) {
      const newTask = await tasksRep.updateQuota(
        req.body.task_id,
        req.body.value
      );
      res.json(newTask);
    }
  } catch (error) {}
}

async function updateQuotaInterval(req, res) {
  try {
    const taskBool = await taskExist(req.body.task_id);
    if (taskBool) {
      const newTask = await tasksRep.updateQuotaInterval(
        req.body.task_id,
        req.body.value
      );
      res.json(newTask);
    }
  } catch (error) {}
}

async function taskExist(id) {
  try {
    const result = await tasksRep.getTasks(id);
    return result ? true : false;
  } catch (e) {
    console.log("error getting task", e);
    return false;
  }
}

async function getTaskOfUser(req, res) {
  try {
    const result = await tasksRep.getTasks(req.session.userId);
    res.send(result.hits.hits.map((task) => task._source));
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
