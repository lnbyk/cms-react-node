const db = require("../model");
const User = db.user
const Role = db.role
var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");


// signup
exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          user.roles = roles.map((role) => role.id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err.message });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err.message });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// sign in
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
