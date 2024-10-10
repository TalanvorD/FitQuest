import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation UpdateUser($userId: ID!, $mainGoal: String, $height: Int, $weight: Int, $bodyfat: Int, $exppoints: Int) {
  updateUser(userId: $userId, mainGoal: $mainGoal, height: $height, weight: $weight, bodyfat: $bodyfat, exppoints: $exppoints) {
    username
    mainGoal
    height
    expPoints
    weightTrack {
      recordedWeight
      recordedAt
    }
    bodyFatTrack {
      recordedBodyFat
      recordedAt
    }
  }
}
`;

export const ADD_ACTIVITY = gql`
  mutation addActivity($name: String!, $calorieBurn: Number!, $statType: String!) {
    addActivity(name: $name, calorieBurn: $calorieBurn, statType: $statType) {
      _id
      name
      calorieBurn
      statType
      activityCreator
      createdAt
    }
  }
`;

export const SAVE_QUEST = gql`
mutation SaveQuest($questId: ID!, $userId: ID!) {
  saveQuest(questId: $questId, userId: $userId) {
    activeQuests {
      _id
      title
      description
      statType
      expValue
      time
    }
  }
}
`;

export const REMOVE_QUEST = gql`
  mutation RemoveQuest($questId: ID!, $exppoints: Int, $userId: ID!) {
  removeQuest(questId: $questId, exppoints: $exppoints, userId: $userId) {
    expPoints
    activeQuests {
      _id
      title
      description
      statType
      expValue
      time
    }
  }
}
`;
