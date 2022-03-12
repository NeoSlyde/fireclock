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
  try {
    const userBool = await userExist(req.body.nickname);
    if (userBool) {
      res.send({});
    } else {
      const r = await usersRep.store({
        nickname: req.body.nickname,
        hashed_password: encryptPassword(req.body.password),
      });
      res.send({
        nickname: "ok",
      });
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function login(req, res) {
  try {
    const result = await usersRep.getUser(req.body.nickname);
    const isPasswordCorrect = bcrypt.compare(
      req.body.password,
      result.hits.hits[0]._source.hashed_password
    );
    console.log("good pass?" + isPasswordCorrect);
    if (isPasswordCorrect === true) {
      res.send({ nickname: "ok" });
    }
  } catch (e) {
    console.log("error getting user", e);
  }
}

async function userDelete(req, res) {
  try {
    const userBool = await userExist(req.params.id);
    if (!userBool) {
      res.status(404).end();
    } else {
      const result = await usersRep.remove(req.params.id);
      res.send(result);
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

async function userExist(nickname) {
  try {
    const result = await usersRep.getUser(nickname);
    return result.hits.total.value > 0 ? true : false;
  } catch (e) {
    console.log("error getting user", e);
    return false;
  }
}

async function userExistbyId(id) {
  try {
    const result = await usersRep.getUserById(id);
    return result ? true : false;
  } catch (e) {
    console.log("error getting user", e);
    return false;
  }
}

export default {
  getUsers,
  create,
  login,
  userExist,
  userExistbyId,
};
