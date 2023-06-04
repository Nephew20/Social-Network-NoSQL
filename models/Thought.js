const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Thoughts Model
const thoughtSchema = new Schema(
  {
    thoughtText: {
     type: String,
     required: 'You should say whay you think!',
     minLength: 1,
     maxLength: 280, 
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
//Virtual to count the amount of reactions
.virtual('reactionCount')
.get(function () {
    return this.reactions.length
})

//Creates the Thought model.
const Thought = model('thought', thoughtSchema)

module.exports = Thought;