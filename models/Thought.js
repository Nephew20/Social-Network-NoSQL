const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Thoughts Model
const thoughtSchema = new Schema(
  {
    thoughtText: {
     type: String,
     required: 'You should say what you think!',
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

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  // Virtual to count the amount of reactions
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length;
  });

// Creates the Thought model.
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;