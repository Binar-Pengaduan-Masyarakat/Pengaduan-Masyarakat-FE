const bcrypt = require('bcryptjs');
const User = require('../models/user');
const path = require('path');

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = { ...userData, password: hashedPassword };
  return User.create(user);
};

const getUserById = async (userId) => {
  return User.findById(userId);
};

const updateUser = async (userId, userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return User.update(userId, userData);
};

const deleteUser = async (userId) => {
  return User.delete(userId);
};

const getFileUrl = (file) => {
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}/uploads/${file.filename}`;
};


module.exports = {
  getFileUrl,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
