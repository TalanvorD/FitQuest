const { User, Activity, Quests } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('activities').populate('activeQuests');
    },
    getUsers: async () => {
      return User.find().sort({ level: -1 })
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('activities').populate('activeQuests');
    },
    activities: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Activity.find(params).sort({ createdAt: -1 });
    },
    activity: async (parent, { activityId }) => {
      return Activity.findOne({ _id: activityId });
    },
    quests: async () => {
      return Quests.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('activities').populate('activeQuests');
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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    addActivity: async (parent, { name, calorieBurn, statType }, context) => {
      if (context.user) {
        const activity = await Activity.create({
          name,
          calorieBurn,
          statType,
          activityCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { activities: activity._id } }
        );

        return activity;
      }
      throw AuthenticationError;
    },
    removeActivity: async (parent, { activityId }, context) => {
      if (context.user) {
        const activity = await Activity.findOneAndDelete({
          _id: activityId,
          activityCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { activities: activity._id } }
        );

        return activity;
      }
      throw AuthenticationError;
    },
    saveQuest: async (parent, { questId, userId } ) => { // Saves a book to the DB
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { activeQuests: questId } },
          { new: true }
        );
        return updatedUser;
    },

    removeQuest: async (parent, { questId, userId } ) => { // Removes a book from the DB
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
          { $pull: { activeQuests: questId } },
          { new: true }
        );
        return updatedUser;
    },
  },
};

module.exports = resolvers;
