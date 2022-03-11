import quotaRep from "./quota-repository";
var bcrypt = require("bcrypt");

async function getQuota(req, res) {
  try {
    const result = await quotaRep.getAll();
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
    const quotaBool = await quotaExist(req.body.quota_id);
    if (quotaBool) {
      res.send({});
    } else {
      const r = await quotaRep.store({
        quota_id: req.body.quota_id,
        task_id: req.body.task_id,
        duration: req.body.duration,
        recurence: req.body.recurence,
      });
      console.log("pass", r);
      res.send({
        quota_id: "ok",
      });
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function deleteQuota(task) {
  try {
    const result = await quotaRep.deleteQuota(task);
    return result ? true : false;
  } catch (e) {
    console.log("error getting quota", e);
    return false;
  }
}

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

async function quotaExist(quota_id) {
  try {
    const result = await quotaRep.getQuota(quota_id);
    return result ? true : false;
  } catch (e) {
    console.log("error getting quota", e);
    return false;
  }
}

export default {
  getQuota,
  create,
  quotaExist,
};
