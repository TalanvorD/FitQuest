const { User, Activity } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('activities');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('activities');
    },
    activities: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Activity.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { activityId }) => {
      return Activity.findOne({ _id: activityId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('activities');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { activities: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { activityId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: activityId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeThought: async (parent, { activityId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: activityId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { activities: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { activityId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: activityId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
