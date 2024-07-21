const userService = require('../services/userService');

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please check the user ID and try again.' });
    }
    // Remove password before returning user data
    const { password, ...userWithoutPassword } = user;
    res.json({ message: 'User profile retrieved successfully.', data: userWithoutPassword });
  } catch (error) {
    console.error('Failed to retrieve user profile:', error); // Log error for internal tracking
    res.status(500).json({ message: 'Internal server error while retrieving user profile.' });
  }
};

const createUserProfile = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ message: 'User profile created successfully.', data: newUser });
  } catch (error) {
    console.error('Failed to create user profile:', error); // Log error for internal tracking
    res.status(500).json({ message: 'Internal server error while creating user profile.' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.userId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found. Please check the user ID and try again.' });
    }
    // Remove password before returning updated user data
    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ message: 'User profile updated successfully.', data: userWithoutPassword });
  } catch (error) {
    console.error('Failed to update user profile:', error); // Log error for internal tracking
    res.status(500).json({ message: 'Internal server error while updating user profile.' });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.status(204).json({ message: 'User profile deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete user profile:', error); // Log error for internal tracking
    res.status(500).json({ message: 'Internal server error while deleting user profile.' });
  }
};

const uploadUserMedia = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // File uploaded successfully
  const fileUrl = userService.getFileUrl(req.file);
  res.json({ mediaUrl: fileUrl });
};


module.exports = {
  uploadUserMedia,
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile
};
