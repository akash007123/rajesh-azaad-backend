const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Public routes
router.post('/', contactController.createContact);

// Admin routes (protected)
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContact);
router.patch('/:id/status', contactController.updateStatus);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router; 