const { Thought, User } = require('../models');

module.exports = {
  // GET all thoughts for /api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find()
      res.json(thoughtData)
    }
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  },
  // GET thought by their ID 
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.Id })
        .select('__v')
        .populate('thoughts')

      if (!thoughtData) {
        res.status(404).json({ message: 'No thought with this ID' })
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },
  // Create a new User
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      
      res.json(thoughtData);
      
      const user = User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );

      res.json(user)

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.Id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //delete a user
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({ _id: req.params.userId });

      if (!thoughtData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Add a friend to the user's friend list
  async addReaction(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
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
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      )

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }

  }
}