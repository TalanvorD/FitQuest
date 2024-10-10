import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import React, { useRef, useEffect, useState } from "react";
import { select, line, curveCardinal } from "d3";
import "../assets/css/profile.css"
import { QUERY_USER, QUERY_USERS, USERS_LEADERBOARD, QUERY_ME, QUERY_QUESTS } from '../utils/queries';
import UserWeight from '../components/UserWeight';
import UserBodyFat from '../components/UserBodyFat';
import UserInfo from '../components/UserInfo';
import UserQuests from '../components/UserQuests';
import QuestList from '../components/QuestList';
import Leaderboard from '../components/Leaderboard';
import UserChart from '../components/UserChart';
import UserImage from '../components/UserImage';

import Auth from '../utils/auth';
import { REMOVE_QUEST } from '../utils/mutations';

const TestPage = () => {
  const { username: userParam } = useParams();
  const { loading: questsLoading, data: allQuests } = useQuery(QUERY_QUESTS);
  const { loading: allUsersLoading, data: allUsers } = useQuery(USERS_LEADERBOARD);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() &&
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (questsLoading) {
    return <div>Loading quests...</div>;
  }

  if (allUsersLoading) {
    return <div>Loading quests...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className='center'>
        <div className="hero">
          {/* <img className="hero"/> */}
          <h2 className="center text-dark p-3 mb-5">
            Welcome {user.username}
          </h2>
          <div className='grid'>
            <div className='profile-section'>
              {/* {user.username} stats: */}
              <UserInfo
                user={user}
                title={`${user.username}'s stats:`}
                showTitle={true}
                showUsername={true}
              />
              <UserQuests
                quests={user.activeQuests}
                title={`${user.username}'s quests:`}
                userId={user._id}
                showTitle={true}
                showUsername={true}
              />
              {/* user character image */}
              {/* user stats (weight height goal) */}
            </div>
            {/* current quest */}
            {/* a section to show trends in weight and maybe even activity */}
          </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
          <div className='profile-section'>
            <UserWeight
              user={user}
              title={`${user.username}'s weight history`}
              showTitle={true}
              showUsername={true}
            />
          </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
          <div className='grid'>
            <div className='profile-section'>
              <UserBodyFat
                user={user}
                title={`${user.username}'s body fat history`}
                showTitle={true}
                showUsername={true}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
          <div className='grid'>
            <div className='profile-section'>
              <Leaderboard
                userList={allUsers}
                title={`Leaderboard:`}
                showTitle={true}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
          <div className='grid'>
            <div className='profile-section'>
              <QuestList
                questList={allQuests}
                title={`Available quests:`}
                userId={user._id}
                showTitle={true}
              />
            </div>
          </div>
        </div>
        <div>
      </div>
      <UserChart
                user={user}
                title={`Chart:`}
                showTitle={true}
              />
        </div>
    </div>
  );
};

export default TestPage;
