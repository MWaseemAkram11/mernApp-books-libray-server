const User = require("../models/users.model");
const bcrypt = require('bcrypt');
const {secretKey} = require("../../config/vars")

/**
 * Register user
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    console.log(`call is connected-----`)
    let { name, email, password } = req.body;
    if (name && email && password) {
      email = email.toLowerCase();
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(200)
          .send({ status: false, message: "User already exists" });
      }
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);
      // Create new user
    const newUser = {
      name,
      password: hashedPassword,
      email,
      type:'user'
    };
    user = await User.create(newUser);
    return res.status(200).send({
      status: true,
      message: "User registered successfully",
      data: payload,
    });
    } else
      return res
        .status(200)
        .send({ status: false, message: "Required fields are missing" });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns jwt token if valid address and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    let { email, password} = req.body;
    email = email.toLowerCase();
    const user = await User.findOne({ email }).lean();
    if (!user)
      return res
        .status(200)
        .send({ success: false, message: "Incorrect email or password" });
    // Compare password hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(200)
        .send({ success: false, message: "Incorrect email or password" });
    }
    else{
      const token = jwt.sign({
        data: {name:user.name, email:user.email}
      }, secretKey , { expiresIn: '4h' });
      let data = {
        ...user._doc,
        token,
      };
      return res
        .status(200)
        .send({ success: false,data:data, message: "User loggedIn successfully" });
    }
  } catch (error) {
    return next(error);
  }
};

