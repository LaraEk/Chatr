const db = require("../models");
const bcrypt = require('bcrypt');
const saltRound = 10

// Defining methods for the booksController
module.exports = {
  // findAll: function(req, res) {
  //   db.User
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  loginUser: function(req, res) {
      db.User
      .findOne({username: req.body.username}).then((err,obj) => {
        if (err) {
          res.json("already exists")
        } else {
          let newPassword = obj.password
          bcrypt.compare(req.body.password, newPassword).then(resp => {
            if (!resp) {
              res.json("no user")
            } else {
            res.json(resp)
            }
          })
    }
  }).catch(err => res.status(422).json(err));
  },
  registerUser: function(req, res) {
    console.log(req.body.username, req.body.password)
    db.User.findOne({username: req.body.username}).then((err,obj) => {
        if (err) {
          res.json("already exists")
        } else {
    bcrypt.hash(req.body.password, saltRound, (err, hash) => {
      db.User.create({username: req.body.username, password: hash}).then(data => res.json(data))
      })
    }
  })
  .catch(err => res.status(422).json(err));
},
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
