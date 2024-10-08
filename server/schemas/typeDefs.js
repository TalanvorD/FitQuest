const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    level: Int
    expPoints: Int
    mainGoal: String
    strength: Int
    intellect: Int
    stamina: Int
    vitality: Int
    createdAt: String
    activities: [Activity]
    height: Int
    weightTrack: [WeightTrack]
    bodyFatTrack: [BodyFatTrack]
  }

  type WeightTrack{
    recordedWeight: Int
    recordedAt: String
  }

  type BodyFatTrack{
    recordedBodyFat: Int
    recordedAt: String
  }

  type Quests{
    _id: ID
    title: String
    description: String
    statType: String
    expValue: Int
  }
  
  type Activity {
    _id: ID
    name: String
    calorieBurn: Int
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
    quests: [Quests]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(mainGoal: String, weight: [Int], bodyfat: [Int]): User
    removeUser(userId: ID!): Auth
    login(email: String!, password: String!): Auth
    addActivity(name: String!, calorieBurn: Int, statType: String, activityCreator: String): Activity
    removeActivity(activityId: ID!): Activity
  }
`;
//    addUser(username: String!, email: String!, password: String!, mainGoal: String!, height: Int, weight: [Int], bodyfat: [Int]): Auth

module.exports = typeDefs;