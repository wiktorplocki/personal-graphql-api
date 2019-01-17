const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const transformUsers = user => {
  return { ...user._doc, password: null, _id: user.id };
};

const users = async () => {
  try {
    const users = await User.find();
    return users.map(user => transformUsers(user));
  } catch (err) {
    throw new Error(err);
  }
};

const singleUser = async args => {
  try {
    const foundUser = await User.findOne({ email: args.userInput.email });
    if (!foundUser) {
      throw new Error('User not found!');
    }
    return transformUsers(foundUser);
  } catch (err) {
    throw new Error(err);
  }
};

const createUser = async args => {
  try {
    const foundUser = await User.findOne({ email: args.userInput.email });
    if (foundUser) {
      throw new Error('User exists already');
    }
    const hashedPwd = await bcrypt.hash(args.userInput.password, 10);
    const user = new User({
      email: args.userInput.email,
      password: hashedPwd
    });
    const result = await user.save();
    return transformUsers(result);
  } catch (err) {
    throw new Error(err);
  }
};

const removeUser = async args => {
  const deletedUser = await User.findByIdAndDelete(args.userId);
  if (!deletedUser) {
    throw new Error('User not found!');
  }
  return transformUsers(deletedUser);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist!');
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('Password is incorrect!');
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return { userId: user.id, token, tokenExpiry: 1 };
};

module.exports = { users, singleUser, createUser, removeUser, login };
