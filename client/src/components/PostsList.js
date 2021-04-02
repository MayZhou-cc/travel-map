import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NewPostForm from './NewPostForm'

const PostsList = () => {
  useEffect(() => {
    axios.get('/api/v1/posts.json')
      .then(res => setPosts(res.data))
  }, []);

  const [posts, setPosts] = useState([]);

  const initialFormState = {
    title: '',
    description: ''
  }

  const addPost = post => {
    const qs = require('qs') //query strings

    //the post will be created in the db as well
    axios.post('/api/v1/posts', qs.stringify({
      post: {
        title: post.title,
        description: post.description
      }
    }))
      .then(res => console.log(res))
      .catch(error => console.log(error))

    setPosts([...posts, post])
  }

  return (
    <div>
      <div className="post-form">
        <NewPostForm initialFormState={initialFormState} addPost={addPost} />
      </div>
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