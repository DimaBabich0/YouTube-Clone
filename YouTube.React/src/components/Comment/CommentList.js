
import React, { useState } from 'react';
import Comment from './Comment';
import './CommentList.css';
const CommentList = () => {
  const [comments, setComments] = useState([
    {
      author: 'Alina Rubak',
      avatar: '/images/profile-pictures/eve.png',
      time: '3 weeks ago',
      text: 'Це неймовірно...'
    },
    {
      author: 'Kristen',
      avatar: '/images/profile-pictures/nexpo.jpg',
      time: '3 weeks ago',
      text: 'Очень нравится эта композиция...'
    },
    // Add more comments as needed
  ]);

  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
