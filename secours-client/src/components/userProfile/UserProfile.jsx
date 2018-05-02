import React from 'react';

const UserProfile = (props) => {
  const { userAuth } = props;
  return (
    <div>
      <h1>User Profile: {userAuth.username}</h1>
      <p>Zipcode: {userAuth.zipcode}</p>
    </div>
  );
}

export default UserProfile;
