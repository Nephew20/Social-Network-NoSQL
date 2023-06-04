const { Schema, Types, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true, 
            required: 'Must have an username',
            trim: true
        },
        email: {
            type: String, 
            required: 'Must hava an email',
            unique: true,
            validate: {
                validator: function (value) {
                  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                  return emailRegex.test(value);
                },
                message: 'Please provide a valid email address',
            },
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