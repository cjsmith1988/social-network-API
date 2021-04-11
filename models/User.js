const { Schema, model } = require('mongoose');
const validator = require('mongoose-validator');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        validate: [
            validator({
            validator: 'isEmail',
            message: '{VALUE} is not a valid email'
            })
        ],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    friends: [],
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought'
        }
      ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
// get total count of comments and replies on retrieval
UserSchema.virtual('thoughtCount').get(function() {
    return this.thought.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});
// create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;