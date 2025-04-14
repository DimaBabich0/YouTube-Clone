import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <img src={comment.avatar} alt="avatar" className="avatar" />
        <div className="comment-content">
          <div className="comment-author-time">
            <div className="comment-author">{comment.author}</div>
            <div className="comment-time">{comment.time}</div>
          </div>
          <div className="comment-body">{comment.text}</div>
        </div>
      </div>
      <div className="comment-actions">
        <img src="/images/Comment/1.png" alt="icon1" />
        <img src="/images/Comment/2.png" alt="icon2" />
        <img src="/images/Comment/3.png" alt="icon3" />
        <img src="/images/Comment/4.png" alt="icon4" />
        <img src="/images/Comment/5.png" alt="icon5" />
        <button>Answer</button>
      </div>
    </div>
  );
};

export default Comment;
