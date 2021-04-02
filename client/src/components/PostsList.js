import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = () => {
  useEffect(() => {
    axios.get('/api/v1/posts.json')
      .then(res => setPosts(res.data))
  }, []);

  const [posts, setPosts] = useState([]);

  return (
    <div>
      <div className="posts-list">
        {posts.map((post, index) => (
          <div key={index}>
            {post.title} | {post.description}
          </div>
        ))}
      </div>
    </div>
  )
};
export default PostsList;