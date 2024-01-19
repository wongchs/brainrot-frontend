import { useEffect, useState } from "react";
import postService from "./services/postService";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll().then((posts) => {
      setPosts(posts);
    });
  }, []);

  console.log(posts)
  return (
    <>
      <div>
        <ul>
          {posts.map((post) => (
            <li>{post.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
