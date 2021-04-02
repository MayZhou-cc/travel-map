import React, { useState } from 'react'

const EditPostForm = ({ currentPost, updatePost, setEditing }) => {
  const [post, setPost] = useState(currentPost)

  const handleInputChange = e => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      if (!post.title || !post.description) return
      updatePost(post)
    }}>
      <label>Title</label>
      <input type="text" name="title" value={post.title} onChange={handleInputChange} />
      <label>Description</label>
      <input type="text" name="description" value={post.description} onChange={handleInputChange} />
      <button>Update Post</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  )
}

export default EditPostForm