import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NewPostForm from './NewPostForm'
import Post from './Post'

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

  const removePost = id => {
    axios.delete('/api/v1/posts/' + id)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id))
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <div className="post-form">
        <NewPostForm initialFormState={initialFormState} addPost={addPost} />
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} removePost={removePost} />
        ))}
      </div>
    </div>
  )
};
export default PostsList;