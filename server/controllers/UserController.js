const db = require("../model");
const User = db.user;
const Role = db.role;

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find({}, { password: 0, __v: 0 });

    users = await Promise.all(
      users.map(async (user) => {
        let roles = await Role.find({ _id: { $in: user.roles } });
        return { ...user._doc, roles: roles.map((role) => role.name) };
      })
    );
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

// delete user by id
exports.deleteUserById = (req, res) => {
  User.findByIdAndDelete(
    {
      _id: req.params.id,
    },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
      if (!user) {
        res.status(400).send({ message: "no associated user" });
        return;
      }
      res.status(200).send({
        message: `Successfully deleted user: ${user._id}`,
      });
    }
  );
};

