const jwt = require("jsonwebtoken");
const db = require("../model/index");
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    res.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                if (roles.some(v => v === "admin")) {
                    next();
                    return;
                }

                res.status(403).send({message: "Require Admin Role!"});
                return;
            }
        )
    })
}

module.exports.verifyToken = verifyToken; 
module.exports.isAdmin = isAdmin;