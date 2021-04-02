import React, { useState } from 'react'

const NewPostForm = ({ initialFormState, addPost }) => {
  const [post, setPost] = useState(initialFormState)

  const handleInputChange = e => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  return (
    <form onSubmit={
      event => {
        event.preventDefault()
        if (!post.title || !post.description) return;
        addPost(post)
        setPost(initialFormState)
      }
    }>
      <label>Title</label>
      <input type="text" name="title" value={post.title} onChange={handleInputChange} ></input>
      <label>Description</label>
      <input type="text" name="description" value={post.description} onChange={handleInputChange} ></input>
      <button>Create Post</button>
    </form>
  )
}

export default NewPostForm