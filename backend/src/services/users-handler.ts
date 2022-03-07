import usersRep from "./users-repository";
var bcrypt = require("bcrypt");

async function getUsers(req, res) {
  try {
    const result = await usersRep.getAll();
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
    const userBool = await userExist(req.body.userName);
    if (userBool) {
      res.send({});
    } else {
      const r = await usersRep.store({
        userName: req.body.userName,
        hashed_password: encryptPassword(req.body.password),
      });
      console.log("pass", r);
      res.send({
        userName: "ok",
      });
    }
  } catch (e) {
    res.status(400).end();
  }
}

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

async function userExist(userName) {
  try {
    const result = await usersRep.getUser(userName);
    return result ? true : false;
  } catch (e) {
    console.log("error getting user", e);
    return false;
  }
}

export default {
  getUsers,
  create,
  userExist,
};
