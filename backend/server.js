import express from "express";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Meta Leads backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
