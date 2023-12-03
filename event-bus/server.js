import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 7003;
app.use(express.json());

const data = [];

app.get("/", (req, res) => res.send("Event bus running!"));

app.post("/events", (req, res) => {
  const event = req.body;
  axios
    .post(`http://localhost:7001/events`, event)
    .catch((err) => console.log(err.message));

  axios
    .post(`http://localhost:7002/events`, event)
    .catch((err) => console.log(err.message));

  axios
    .post(`http://localhost:7004/events`, event)
    .catch((err) => console.log(err.message));

  res.send({ status: "Ok" });
});

app.listen(PORT, () =>
  console.log(`Event bus listening on http://localhost:${PORT}/`)
);