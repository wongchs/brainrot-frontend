const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.content}</h2>
      <p>{post.user.name}</p>
      <p>by {post.user.username}</p>
    </div>
  );
};

export default Post;
