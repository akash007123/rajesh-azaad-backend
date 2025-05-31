const express = require('express');
const router = express.Router();
const {
  createAdminData,
  getAdminData,
  getSingleAdminData,
  updateAdminData,
  deleteAdminData
} = require('../controllers/adminDataController');

router.route('/')
  .post(createAdminData)
  .get(getAdminData);

router.route('/:id')
  .get(getSingleAdminData)
  .put(updateAdminData)
  .delete(deleteAdminData);

module.exports = router; 