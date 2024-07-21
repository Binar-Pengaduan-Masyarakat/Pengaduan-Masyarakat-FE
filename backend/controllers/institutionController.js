// controllers/institutionController.js
const institutionService = require('../services/institutionService');

const createInstitution = async (req, res) => {
  try {
    const institution = await institutionService.createInstitution(req.body);
    res.status(201).json(institution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await institutionService.getAllInstitutions();
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInstitutionById = async (req, res) => {
  try {
    const institution = await institutionService.getInstitutionById(req.params.id);
    if (institution) {
      // Menghapus properti password sebelum mengembalikan data
      const { password, ...institutionWithoutPassword } = institution;
      res.json(institutionWithoutPassword);
    } else {
      res.status(404).json({ message: 'Institution not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInstitution = async (req, res) => {
  try {
    const institution = await institutionService.updateInstitution(req.params.id, req.body);
    // Menghapus properti password sebelum mengembalikan data
    const { password, ...institutionWithoutPassword } = institution;
    res.json(institutionWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInstitution = async (req, res) => {
  try {
    await institutionService.deleteInstitution(req.params.id);
    res.status(204).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
};
