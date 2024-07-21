// services/institutionService.js
const User = require('../models/user');

const createInstitution = async (data) => {
  data.roles = 'INSTITUTION';  // Ensure all institutions have the correct role
  return User.create(data);
};

const getAllInstitutions = async () => {
  return User.findByRole('INSTITUTION');
};

const getInstitutionById = async (id) => {
  return User.findById(id);
};

const updateInstitution = async (id, data) => {
  return User.update(id, data);
};

const deleteInstitution = async (id) => {
  return User.delete(id);
};

module.exports = {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
};
