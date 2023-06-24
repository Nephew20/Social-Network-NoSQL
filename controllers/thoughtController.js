const Thought  = require('../models/Thought');
const User = require('../models/User')

module.exports = {
  // GET all thoughts for /api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find()
    
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // GET thought by their ID 
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
  
      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }
  
      if (!thoughtData.reactions) {
        thoughtData.reactions = [];
      }
  
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving thought' });
    }
  },
  // Create a new Thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData } },
        { new: true }
      );
      
      const userThoughts = {
        thought: thoughtData,
        user: user
      };
      
      res.json(userThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
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

  //delete a thought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({ _id: req.params.userId });

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Add a reaction to the thought model
  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.params.body } },
        { new: true, runValidators: true }
      )

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thoughtData);

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  //Delete a reaction from the thought model
  async removeReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      )

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }

  }
}