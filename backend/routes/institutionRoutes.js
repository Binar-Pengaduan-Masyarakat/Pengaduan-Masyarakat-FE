// routes/institutionRoutes.js
const express = require('express');
const router = express.Router();
const institutionController = require('../controllers/institutionController');

router.post('/institution', institutionController.createInstitution);
router.get('/institution', institutionController.getAllInstitutions);
router.get('/institution/:id', institutionController.getInstitutionById);
router.get('/:id', institutionController.getInstitutionById);
router.put('/institution/:id', institutionController.updateInstitution);
router.delete('/institution/:id', institutionController.deleteInstitution);

module.exports = router;
