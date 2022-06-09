const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const passport = require('passport');
// Create and Save a new User
exports.create = (req, res) => {

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at
  };
  // Save User in the database
  User.create(user)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.send({
        error: {
          code: res.status,
          description: err.message
        }
      })
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
    title: {
      [Op.like]: `%${title}%`
    }
  } : null;

  User.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: {
          code: res.status,
          description: err.message
        }
      })
    });
};

// // Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
    })
    .catch(err => {
      res.send({
        error: {
          code: res.status,
          description: err.message
        }
      })
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send();
      }
    })
    .catch(err => {
      res.send({
        error: {
          code: res.status,
          description: err.message
        }
      })
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send();
      }
    })
    .catch(err => {
      res.send({
        error: {
          code: res.status,
          description: err.message
        }
      })
    });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.send({
        error: {
          code: res.status,
          description: err.message
        }
      })
    });
};

// find all published User
exports.findAllPublished = (req, res) => {
  User.findAll({
      where: {
        published: true
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: {
          code: res.status,
          description: err.message
        }
      })
    });
};
