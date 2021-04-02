import React from 'react'

const Post = ({ post, removePost }) => (
  <div>
    <h4>
      {post.title}
    </h4>
    <p>
      {post.description}
    </p>
    <button onClick={() => removePost(post.id)}>
      Remove
    </button>
  </div>
)

export default Post