import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 7005;

app.use(express.json());

app.get("/", (req, res) => res.send("Moderation server running"));

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type == "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    axios
      .post("http://localhost:7003/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => console.log(err.message));

    res.send({});
  }
});

app.listen(PORT, () =>
  console.log(`Moderation server running on http://localhost:${PORT}`)
);
