const express = require('express');
const router = express.Router();
const medicalAidController = require('../controllers/medicalAidController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, medicalAidController.getMedicalAids);
router.post('/', authenticate, medicalAidController.createMedicalAid);

module.exports = router;
