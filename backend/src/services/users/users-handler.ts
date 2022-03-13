import usersRep from "./users-repository";
import bcrypt from "bcrypt";
import { User } from "../../../../frontend/src/app/auth/auth.service";

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
  try {
    const userBool = await userExist(req.body.nickname);
    if (userBool) {
      res.status(400).send("user already exists");
    } else {
      const r = await usersRep.store({
        nickname: req.body.nickname,
        hashed_password: encryptPassword(req.body.password),
      });

      const user: User = {
        id: r._id,
        nickname: req.body.nickname,
      };
      res.json(user);
    }
  } catch (e) {
    res.status(400).send("???");
  }
}

async function login(req, res) {
  try {
    const result = await usersRep.getUser(req.body.nickname);
    const userRes = result.hits.hits[0];

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userRes._source.hashed_password
    );
    if (isPasswordCorrect === true) {
      req.session.userId = userRes._id;
      const user: User = {
        id: userRes._id,
        nickname: userRes._source.nickname,
      };
      res.json(user);
    } else {
      res.status(401).send("wrong password");
    }
  } catch (e) {
    res.status(400).send("user not found");
  }
}

async function logout(req, res) {
  if (res.session?.userId) res.session.userId = undefined;
  res.json({ ok: "OK" });
}

async function currentUser(req, res) {
  if (req.session?.userId && (await userExistbyId(req.session.userId))) {
    const userRes = (await usersRep.getUserById(req.session.userId)).hits
      .hits[0];
    const user: User = {
      id: userRes._id,
      nickname: userRes._source.nickname,
    };
    res.json(user);
  } else {
    res.json(null);
  }
}

async function userDelete(req, res) {
  try {
    const userBool = await userExist(req.query.id);
    if (!userBool) {
      res.status(404).end();
    } else {
      const result = await usersRep.remove(req.query.id);
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
  logout,
  userExistbyId,
  currentUser,
};
