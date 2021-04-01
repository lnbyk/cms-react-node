const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  var SALT_FACTOR = 5;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);
    user.password = bcrypt.hashSync(user.password, salt);
    next()
  });
});


module.exports = mongoose.model("User", userSchema);
