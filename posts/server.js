import { randomBytes } from "crypto";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

app.get("/", (req, res) => res.send("Posts Server running!"));

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  axios
    .post("http://event-bus-srv:7003/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err.message));

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => res.send({}));

app.listen(PORT, () =>
  console.log(`Posts Server running on http://localhost:${PORT}`)
);
