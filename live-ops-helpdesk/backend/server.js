const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://live-ops-helpdesk-snowy.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Demo ticket database (stored in memory)
let tickets = [
  {
    id: 101,
    title: "Truck Breakdown",
    customer: "ABC Logistics",
    status: "Open",
    resolution: "",
    locked: false,
    lockedBy: null,
  },
  {
    id: 102,
    title: "Missed Delivery",
    customer: "Rapid Cargo",
    status: "Open",
    resolution: "",
    locked: false,
    lockedBy: null,
  },
  {
    id: 103,
    title: "Late Shipment",
    customer: "North Transport",
    status: "Pending",
    resolution: "",
    locked: false,
    lockedBy: null,
  },
];

io.on("connection", (socket) => {
  console.log("Client Connected");

  // Send all tickets to new client
  console.log("Sending tickets:", tickets);
socket.on("get_tickets", () => {
  socket.emit("all_tickets", tickets);
});

  // Lock Ticket
  socket.on("lock_ticket", ({ ticketId, lockedBy }) => {
    const ticket = tickets.find((t) => t.id === ticketId);

    if (!ticket) return;

    if (!ticket.locked) {
      ticket.locked = true;
      ticket.lockedBy = lockedBy;

      io.emit("ticket_locked", {
        ticketId,
        lockedBy,
      });
    }
  });

  // Unlock Ticket
  socket.on("unlock_ticket", ({ ticketId }) => {
    const ticket = tickets.find((t) => t.id === ticketId);

    if (!ticket) return;

    ticket.locked = false;
    ticket.lockedBy = null;

    io.emit("ticket_unlocked", {
      ticketId,
    });
  });

  // Save Resolution
  socket.on("save_ticket", ({ ticketId, resolution }) => {
    const ticket = tickets.find((t) => t.id === ticketId);

    if (!ticket) return;

    ticket.resolution = resolution;
    ticket.status = "Resolved";

    ticket.locked = false;
    ticket.lockedBy = null;

    io.emit("ticket_updated", ticket);

    io.emit("ticket_unlocked", {
      ticketId,
    });
  });

  // Create Ticket
  socket.on("create_ticket", (ticket) => {
    tickets.push(ticket);

    io.emit("ticket_created", ticket);
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});
app.get("/", (req, res) => {
  res.send("Live Ops Helpdesk Backend Running ✅");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});