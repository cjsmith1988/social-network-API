const { Schema, model, Types } = require('mongoose');
const validator = require('mongoose-validator');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        maxlength: 280,
        trim: true,
        required: true
      },
      userName: 
        {
          type: String,
          required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const ThoughtSchema = new Schema({
    thoughtText: {
      type: String,
      maxlength: 280,
      trim: true,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    userName: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  } 
);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Comment = model('Thought', ThoughtSchema);

module.exports = Comment;