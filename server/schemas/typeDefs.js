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
    activeQuests: [Quests]
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
    time: String
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
    getUsers: [User]
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
    addActivity(name: String!, calorieBurn: Int, statType: String): Activity
    removeActivity(activityId: ID!): Activity
    saveQuest(questId: ID!, userId: ID!): User
    removeQuest(questId: ID!, userId: ID!): User
  }
`;

module.exports = typeDefs;
