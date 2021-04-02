import React from 'react'

const Post = ({ post, removePost, editing, editPost }) => (
  <div>
    <h4>
      {post.title}
    </h4>
    <p>
      {post.description}
    </p>
    {
      !editing && <button onClick={() => { editPost(post) }}>Edit</button>
    }
    <button onClick={() => removePost(post.id)}>
      Remove
    </button>
  </div>
)

export default Post