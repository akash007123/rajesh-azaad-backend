const AdminData = require('../models/AdminData');

// Create new admin data
exports.createAdminData = async (req, res) => {
  try {
    const adminData = await AdminData.create(req.body);
    res.status(201).json({
      success: true,
      data: adminData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all admin data
exports.getAdminData = async (req, res) => {
  try {
    const adminData = await AdminData.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: adminData.length,
      data: adminData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single admin data
exports.getSingleAdminData = async (req, res) => {
  try {
    const adminData = await AdminData.findById(req.params.id);
    if (!adminData) {
      return res.status(404).json({
        success: false,
        error: 'Admin data not found'
      });
    }
    res.status(200).json({
      success: true,
      data: adminData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update admin data
exports.updateAdminData = async (req, res) => {
  try {
    const adminData = await AdminData.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!adminData) {
      return res.status(404).json({
        success: false,
        error: 'Admin data not found'
      });
    }
    res.status(200).json({
      success: true,
      data: adminData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete admin data
exports.deleteAdminData = async (req, res) => {
  try {
    const adminData = await AdminData.findByIdAndDelete(req.params.id);
    if (!adminData) {
      return res.status(404).json({
        success: false,
        error: 'Admin data not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 