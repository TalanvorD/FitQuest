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

//Delete this later
/* export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

//Delete this later
export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`; */

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
