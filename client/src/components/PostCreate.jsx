import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title?.trim()) {
      await axios.post("http://localhost:7001/posts", { title });
      toast.success("Post uploaded!");
      setTitle("");
    } else {
      toast.error("Please enter post title");
    }
  };

  return (
    <>
      <h1 className="text-center">Create Post</h1>
      <form className="form-group my-1" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="post-title"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default PostCreate;
