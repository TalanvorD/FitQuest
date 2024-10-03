const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    level: Number
    expPoints: Number
    mainGoal: String
    strength: Number
    intellect: Number
    stamina: Number
    vitality: Number
    createdAt: Date
    activities: [Activity]
    height: Number
    weightTrack: [recordedWeight, recordedAt]
    bodyFatTrack: [recordedBodyFat, recordedAt]
  }

  type Activity {
    _id: ID
    name: String
    calorieBurn: Number
    createdAt: String
    statType: String
    activityCreator: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    activities(username: String): [Activity]
    activity(activityId: ID!): Activity
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, mainGoal: String!, height: Number, weight: [Number], bodyfat: [Number]): Auth
    updateUser(mainGoal: String, weight: [Number], bodyfat: [Number]): User
    removeUser(userId: ID!): Auth
    login(email: String!, password: String!): Auth
    addActivity(name: String!, calorieBurn: Number, statType: String, activityCreator: String): Activity
    removeActivity(activityId: ID!): Activity
  }
`;

module.exports = typeDefs;
