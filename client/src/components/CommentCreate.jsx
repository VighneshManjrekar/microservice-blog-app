import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CommentCreate = ({ id }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content?.trim()) {
      await axios.post(`http://localhost:7002/posts/${id}/comments`, { content });
      toast.success("Comment uploaded!");
      setContent("");
    } else {
      toast.error("Please enter content for comment");
    }
  };

  return (
    <>
      <form className="form-group my-1 mx-2" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            New Comment
          </label>
          <input
            type="text"
            className="form-control"
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-describedby="post-comment"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CommentCreate;
