import { gql } from '@apollo/client';

/* Just added */
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      level
      expPoints
      mainGoal
      strength
      intellect
      stamina
      vitality
      activities {
        _id
        name
        createdAt
      }
      height
      weightTrack {
      recordedWeight
      recordedAt
    }
      bodyFatTrack {
      recordedBodyFat
      recordedAt
    }
      createdAt
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query users {
    users {
      _id
      username
      email
      level
      expPoints
      mainGoal
      strength
      intellect
      stamina
      vitality
      createdAt
    }
  }
`;

export const QUERY_ACTIVITIES = gql`
  query getActivities {
    activities {
      _id
      name
      calorieBurn
      createdAt
      statType
      activityCreator
    }
  }
`;

export const QUERY_QUESTS = gql`
  query getQuests {
    quests {
      _id
      title
      description
      statType
      expValue
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      level
      expPoints
      mainGoal
      strength
      intellect
      stamina
      vitality
      activities {
        _id
        name
        createdAt
        }
      height
      weightTrack {
      recordedWeight
      recordedAt
    }
      bodyFatTrack {
      recordedBodyFat
      recordedAt
    }
      createdAt
      }
  }
`;
