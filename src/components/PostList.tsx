import React from "react";
import { Link } from "react-router-dom";
import { PostInterface } from "types";

interface PostListProps {
  posts: PostInterface[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Link to={`/${post.user.username}/post/${post.id}`}>
          <div key={post.id}>
            <h2>{post.user.name}</h2>
            <h3>@{post.user.username}</h3>
            {post.content}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
