const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const { name, companyName, email, tel, password } = req.body;

  try {
    const user = await UserModel.create({
      name,
      companyName,
      email,
      tel,
      password,
    });
      res.redirect("/login");

  }
  catch(err) {
    console.log(err)
    const errors = signUpErrors(err);
    res.render("register", {
      errors,
      name,
      companyName,
      email,
      tel,
      password
    });
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.redirect("/businessCard");
  } catch (err){
    const errors = signInErrors(err);
    res.render("login", { errors, email, password });

  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}