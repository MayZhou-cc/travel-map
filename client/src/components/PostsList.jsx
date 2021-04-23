import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NewPostForm from './NewPostForm'
import EditPostForm from './EditPostForm'
import Post from './Post'

const PostsList = () => {
  const initialFormState = {
    title: '',
    description: ''
  }

  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState(initialFormState)

  const addPost = post => {
    const qs = require('qs') //query strings

    //the post will be created in the db as well
    axios.post('/api/v1/posts', qs.stringify(
      {
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

  const editPost = post => {
    setEditing(true)
    setCurrentPost({
      id: post.id,
      title: post.title,
      description: post.description
    })
  }

  const updatePost = updatedPost => {
    setEditing(false)

    const qs = require('qs')
    axios.patch('/api/v1/posts/' + updatedPost.id, qs.stringify(
      {
        post: {
          title: updatedPost.title,
          description: updatedPost.description
        }
      }
    ))
      .then(res => console.log(res.data))

    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)))
  }

  useEffect(() => {
    axios.get('/api/v1/posts.json')
      .then(res => setPosts(res.data))
  }, []);

  return (
    <div>
      <div className="post-form">
        <div>
          {
            editing ? (
              <EditPostForm
                setEditing={setEditing}
                currentPost={currentPost}
                updatePost={updatePost}
              />
            ) :
              <NewPostForm initialFormState={initialFormState} addPost={addPost} />
          }
        </div>
      </div>
      <br />
      <hr />
      <div className="posts-list">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            removePost={removePost}
            editing={editing}
            editPost={editPost}
          />
        ))}
      </div>
    </div>
  )
};
export default PostsList;
