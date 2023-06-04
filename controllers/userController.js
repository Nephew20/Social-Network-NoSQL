const { User } = require('../models/User');

const userController = {
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
            const userData = await User.findOne({_id: req.params.userId})
            .select('__v')
            .populate('friends')
            .populate('thoughts')

            if(!userData) {
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
            { _id: req.params.Id},
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

      //delete a video
      async deleteUser(req, res) {
        try {
          const userData = await Video.findOneAndRemove({ _id: req.params.userId });
    
          if (!userData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }

          res.json({ message: 'User successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      }
}

module.exports = userController