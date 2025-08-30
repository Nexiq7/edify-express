import { UsersService } from '../services/users.service.js';
const usersService = new UsersService();

export const createUser = async (req, res) => {
     const { username, email } = req.body;
     try {
          const user = await usersService.createUser(username, email);
          res.json(user);
     } catch (err) {
          res.status(400).json({ error: err.message });
     }
}

export const deleteUserById = async (req, res) => {
     const { userId } = req.params;
     try {
          const deletedUser = await usersService.deleteUserById(userId);
          if (!deletedUser) {
               return res.status(404).json({ error: 'User not found' });
          }
          res.json({ message: 'User deleted successfully', user: deletedUser });
     } catch (err) {
          console.error('Error deleting user:', err);
          res.status(500).json({ error: 'Error deleting user' });
     }
}

export const getUserById = async (req, res) => {
     const { userId } = req.params;
     try {
          const user = await usersService.getUserById(userId);
          if (!user) {
               return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
     } catch (err) {
          console.error('Error retrieving user:', err);
          res.status(500).json({ error: 'Error retrieving user' });
     }
}

export const getAllUsers = async (req, res) => {
     try {
          const users = await usersService.getAllUsers();
          res.json(users);
     } catch (err) {
          console.error('Error retrieving users:', err);
          res.status(500).json({ error: 'Error retrieving users' });
     }
}