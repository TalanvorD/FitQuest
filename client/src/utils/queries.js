import { gql } from '@apollo/client';

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
    activeQuests {
        _id
        title
        description
        statType
        expValue
        time
      }
      createdAt
    }
  }
`;

export const QUERY_USERS = gql`
query users {
  users {
    username
    _id
    email
    level
    expPoints
    mainGoal
    strength
    intellect
    stamina
    vitality
    createdAt
    activities {
      _id
      name
      calorieBurn
      createdAt
      statType
      activityCreator
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

export const USERS_LEADERBOARD = gql`
query getUsers {
  getUsers {
    _id
    username
    level
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
      time
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
      activeQuests {
        _id
        title
        description
        statType
        expValue
        time
      }
      createdAt
    }
  }
`;
