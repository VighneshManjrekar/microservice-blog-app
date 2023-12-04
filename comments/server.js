import { randomBytes } from "crypto";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 7002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const comments = {};

app.get("/", (req, res) => res.send("Comments Service running!"));

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(comments[id] || {});
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id: postId } = req.params;
  comments[postId] = comments[postId] || [];
  comments[postId].push({ id, content, status: "pending" });

  axios
    .post("http://localhost:7003/events", {
      type: "CommentCreated",
      data: {
        id,
        content,
        postId,
        status: "pending",
      },
    })
    .catch((err) => console.log(err.message));

  res.status(201).send(comments[postId]);
});

app.post("/events", (req, res) => {
  const { type } = req.body;
  if (type == "CommentModerated") {
    const { postId, id, status, content } = req.body.data;
    const cmnts = comments[postId];
    const comment = cmnts.find((cmnt) => cmnt.id == id);
    comment.status = status;

    axios
      .post("http://localhost:7003/events", {
        type: "CommentUpdated",
        data: { id, content, postId, status },
      })
      .catch((err) => err.message);
  }
  res.send({});
});

app.listen(PORT, () =>
  console.log(`Comments Server running on http://localhost:${PORT}`)
);
