const User = require('./model');

exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const checkUser = await User.findOne({ name: name });

    if (!checkUser) {
      const user = new User({
        name: name,
        password: password,
      });
      const result = await user.save();
      res.status(201).send({ message: "User registered successfully!", userId: result._id });

    } else {
      throw res.status(409).send({ error: "User name already exists." });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      throw res.status(404).send({ error: "Could not find user." });
    };

    if (req.body.password != user.password) {
      throw res.status(401).send({ error: "Password was incorrect." });
    };

    res.status(200).send({
      id: user.id,
      username: user.name,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.status(200).send({
      user: user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
