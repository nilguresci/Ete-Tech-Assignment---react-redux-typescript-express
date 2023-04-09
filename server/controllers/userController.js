const users = require("../../database/user.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var fs = require("fs");
const fsp = require("fs/promises");
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");

let fileExists = fs.existsSync(
  path.join(__dirname, "../../database/user.json")
);
console.log("user.json exists:", fileExists);

console.log(fileExists ? "Found" : "Not Found!");

// @desc Register new user
// @route POST /api/user

const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !firstName || !lastName || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  async function registerF() {
    try {
      const data = await fsp
        .readFile(path.join(__dirname, "../../database/user.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then((json) => {
          let users = json;
          const userExists = users.find(
            (user) => user.username == req.body.username
          );
          if (userExists) {
            res.status(400);
            console.log("user already exists");
            throw new Error("User already exists.");
          }
          const saltRounds = 10;
          console.log(req.body.password);
          // bcrypt.genSalt(saltRounds, function (err, salt) {
          //   bcrypt.hash(req.body.password, salt, function (err, hash) {
          //     console.log("hash", hash);
          //     req.body.password = hash;
          //     return hash;
          //   });
          // });

          const date = new Date();
          req.body.createdAt = date;
          req.body.id = uuidv4();

          users.push(req.body);
          if (req.body.id) {
            console.log(req.body);
            res.status(201).json({
              //201 - ok  and something created
              id: req.body.id,
              username: req.body.username,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            });
          } else {
            res.status(400);
            throw new Error("Invalid user data");
          }
          return users;
        })
        .then((json) => JSON.stringify(json))
        .then((body) =>
          fsp.writeFile(path.join(__dirname, "../../database/user.json"), body)
        );
      return data.catch((error) => console.warn(error));
    } catch (err) {
      console.log(err);
    }
  }
  registerF();
};

// @desc Authenticate a user
// @route POST /api/user/login

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  async function loginF() {
    try {
      return await fsp
        .readFile(path.join(__dirname, "../../database/user.json"), {
          encoding: "utf8",
        })
        .then((body) => JSON.parse(body))
        .then(async (json) => {
          let users = json;
          const user = await users.find(
            (user) => user.username == req.body.username
          );
          if (user) {
            console.log("var", user);
          }
          if (user && user.password === req.body.password) {
            return res.status(200).json({
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
            });
          } else {
            res.status(400);
            throw new Error("Invalid credentials");
          }

          //   if (user && (await bcrypt.compare(password, user.password))) {
          //     res.status(200).json({
          //       id: user.id,
          //       username: user.username,
          //     });
          //   } else {
          //     res.status(400);
          //     throw new Error("Invalid credentials");
          //   }
        });
    } catch (err) {
      console.log(err);
    }
  }
  loginF();
};

module.exports = {
  registerUser,
  loginUser,
};
