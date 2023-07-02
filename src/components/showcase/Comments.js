import React from 'react';

import './Comments.scss';

const Comments = ({ commentsArr }) => {
  return (
    <div className='comments'>
      <h2>Comments</h2>
      {commentsArr.length === 1 ? (
        <p>{commentsArr[0]}</p>
      ) : (
        <ul>
          {commentsArr.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
