import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 7004;
app.use(cors());
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type == "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type == "CommentUpdated") {
    const { id, postId, content, status } = data;
    const { comments } = posts[postId];
    const comment = comments.find((c) => c.id == id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.status(200).send({ success: true });
});

app.listen(PORT, async () => {
  console.log(`Query server running on http://locahost:${PORT}/`);
  try {
    const res = await axios("http://localhost:7003/events");
    res.data.forEach((e) => {
      handleEvent(e.type, e.data);
    });
  } catch (error) {
    console.log(error.message);
  }
});
