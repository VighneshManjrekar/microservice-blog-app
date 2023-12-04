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
    <div className="row w-sm-100 w-100 d-flex justify-content-evenly">
      {posts ? (
        Object.values(posts).map((post) => (
          <div
            key={post.id}
            className="card col-10 col-md-5 col-lg-3 mx-0 mb-3 mx-md-2"
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
