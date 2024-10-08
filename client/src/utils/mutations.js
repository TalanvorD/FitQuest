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
  mutation updateUser($username: String!, $email: String!, $password: String!) {
    updatedUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
  mutation RemoveQuest($questId: ID!, $userId: ID!) {
  removeQuest(questId: $questId, userId: $userId) {
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


//Delete this later
export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

//Delete this later
export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;