import usersRep from "./users-repository";
import bcrypt from "bcrypt";

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
    const user = result.hits.hits[0];
    console.log(result);
    console.log(result.hits.hits[0]._id);

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user._source.hashed_password
    );
    console.log("good pass?" + isPasswordCorrect);
    if (isPasswordCorrect === true) {
      req.session.userId = user._id;
      console.log({ id: user._id, nickname: user._source.nickname });
      res.send({ id: user._id, nickname: user._source.nickname });
    } else {
      res.send({ error: "wrong password", code: 401 });
    }
  } catch (e) {
    console.log("error getting user", e);
    res.send({ error: "User Not Found", code: 400 });
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
