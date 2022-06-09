module.exports = app => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();

  // users
  router.post("/", users.create);

  router.get("/", users.findAll);

  router.put("/:id", users.update);

  router.delete("/:id", users.delete);

  router.delete("/", users.deleteAll);

  app.use('/users', router);

};
