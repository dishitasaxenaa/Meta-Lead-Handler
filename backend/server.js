import express from "express";
import "dotenv/config";
import ngrok from "@ngrok/ngrok";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 5001;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("initial-leads", leads);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

async function forwardToApp() {
  const forwarder = await ngrok.forward({
    addr: PORT,
    authtoken: process.env.NGROK_AUTHTOKEN,
    domain: "drapery-factual-baboon.ngrok-free.dev",
  });
  console.log(`Available at: ${forwarder.url()}`);
}

forwardToApp();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Meta Leads backend is running!");
});

const leads = [];

app.post("/webhook", (req, res) => {
  const entries = req.body.entry || [];

  for (const entry of entries) {
    for (const change of entry.changes || []) {
      if (change.field === "leadgen") {
        leads.push(change.value);
        io.emit("new-lead", change.value);
      }
    }
  }

  console.log("Stored leads:", leads);
  res.sendStatus(200);
});

app.get("/leads", (req, res) => {
  res.json(leads);
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log({
    mode: req.query["hub.mode"],
    token: req.query["hub.verify_token"],
    savedToken: process.env.META_VERIFY_TOKEN,
  });

  if (
    mode === "subscribe" &&
    token === process.env.META_VERIFY_TOKEN
  ) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
