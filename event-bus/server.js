import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 7003;
app.use(express.json());

const events = [];

app.get("/", (req, res) => res.send("Event bus running!"));

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios
    .post(`http://posts-clusterip-srv:7001/events`, event)
    .catch((err) => console.log("posts: ", err.message));

  axios
    .post(`http://localhost:7002/events`, event)
    .catch((err) => console.log("cmnts: ", err.message));

  axios
    .post(`http://localhost:7004/events`, event)
    .catch((err) => console.log("query: ", err.message));

  axios
    .post(`http://localhost:7005/events`, event)
    .catch((err) => console.log("mod: ", err.message));

  res.send({ status: "Ok" });
});

app.get("/events", (req, res) => res.send(events));

app.listen(PORT, () =>
  console.log(`Event bus listening on http://localhost:${PORT}/`)
);
