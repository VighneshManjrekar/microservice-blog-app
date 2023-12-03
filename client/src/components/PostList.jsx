import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:7004/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {posts ? (
        Object.values(posts).map((post) => (
          <div
            key={post.id}
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
            </div>
            <CommentList comments={post.comments} />
            <CommentCreate id={post.id} />
          </div>
        ))
      ) : (
        <>No posts</>
      )}
    </div>
  );
};

export default PostList;
