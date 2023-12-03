import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 7004;
app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type == "CommentCreated") {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
  }

  res.status(200).send({ success: true });
});

app.listen(PORT, () =>
  console.log(`Query server running on http://locahost${PORT}/`)
);
