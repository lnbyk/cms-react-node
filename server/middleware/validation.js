// Validation
const Joi = require("@hapi/joi");
const User = require("../model/User");

// Register Validation
const registerValidation = (data, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(data.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
  }
  next();
};

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  // User.findOne({
  //   name: req.body.name
  // }).exec((err, user) => {
  //   if (err) {
  //       console.log(err)
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   if (user) {
  //     res.status(400).send({ message: "Failed! Username is already in use!" });
  //     return;
  //   }

  //

  // });

  // Email
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  });
};

// Login Validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
  }
  next();
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

module.exports.registerValidation = registerValidation;
module.exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
module.exports.checkRolesExisted = checkRolesExisted;
module.exports.loginValidation = loginValidation;
