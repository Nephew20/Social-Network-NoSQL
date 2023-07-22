const User = require('../models/User.js');

module.exports = {
  // GET all users for /api/users
  async getUsers(req, res) {
    try {
      const userData = await User.find()
      res.json(userData)
    }
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  },
  // GET user by their ID 
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('__v')
        .populate('thoughts')

      if (!userData) {
        res.status(404).json({ message: 'No user with this ID' })
      }

      res.json(userData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  // Create a new User
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //delete a user
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Add a friend to the user's friend list
  async addFriend(req, res) {
    try {

      friendData = await User.create(req.body)

      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: friendData.friendId } },
        { new: true, runValidators: true }
      )

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(userData);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a friend from the user list 
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'Friend successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }

  }
}

