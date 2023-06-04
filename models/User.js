const { Schema, Types, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true, 
            required: true,
            trim: true
        },
        email: {
            type: String, 
            required: true,
            unique: true,
        },
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', 
            },
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
//Creates the virtual friendCount to count the amount of friends
.virtual('friendCount')
.get(function () {
    return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;