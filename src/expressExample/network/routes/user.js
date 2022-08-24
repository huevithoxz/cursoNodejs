const { Router } = require("express");
const { nanoid } = require("nanoid");
const users = require("../../data/user");
const response = require("./response");

const userRouter = Router();

// http://localhost:3000/user
userRouter
  .route("/user")

  .get((req, res) => {
    response({ error: false, message: users, res, status: 200 });
  })
  .post((req, res) => {
    console.log("req.body", req.body);
    const {
      body: { name, email },
    } = req;

    users.push({
      id: nanoid(),
      name,
      email,
    });

    response({ error: false, message: users, res, status: 201 });
  });

userRouter
  .route("/user/:id")
  .delete((req, res) => {
    const {
      params: { id },
    } = req;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return response({
        message: `User with id> ${id} was not found`,
        res,
        status: 404,
      });
    }
    users.splice(userIndex, 1);
    response({ error: false, message: users, res, status: 200 });
  })
  .patch((req, res) => {
    const {
      body: { name, email },
      params: { id },
    } = req;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return response({
        message: `User with id> ${id} was not found`,
        res,
        status: 404,
      });
    }

    const userWithUpdatedData = {name,email}

    users.splice(userIndex, 1, {
      ...users[userIndex],
      ...(name && {name}),
      ...(email && { email})
    });
    response({ error: false, message: users, res, status: 200 });
  });
module.exports = userRouter;
