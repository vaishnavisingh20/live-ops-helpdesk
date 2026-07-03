"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import TicketCard from "../components/TicketCard";
import ConnectionBanner from "../components/ConnectionBanner";

export default function Home() {

  // Logged-in Agent
  const [currentUser, setCurrentUser] = useState("Agent A");

  // Socket Status
  const [connected, setConnected] = useState(true);

  // Tickets received from backend
  const [tickets, setTickets] = useState([]);

  useEffect(() => {

    // Connected
    socket.on("connect", () => {
      console.log("Connected");
      setConnected(true);
    });

    // Disconnected
    socket.on("disconnect", () => {
      console.log("Disconnected");
      setConnected(false);
    });

    // Receive all tickets
    socket.on("all_tickets", (allTickets) => {
  console.log("Received tickets:", allTickets);
  setTickets(allTickets);
});

    // New ticket created
    socket.on("ticket_created", (ticket) => {
      setTickets((prev) => [...prev, ticket]);
    });
        // Ticket Locked
    socket.on("ticket_locked", (data) => {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === data.ticketId
            ? {
                ...ticket,
                locked: true,
                lockedBy: data.lockedBy,
              }
            : ticket
        )
      );
    });

    // Ticket Unlocked
    socket.on("ticket_unlocked", (data) => {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === data.ticketId
            ? {
                ...ticket,
                locked: false,
                lockedBy: null,
              }
            : ticket
        )
      );
    });

    // Ticket Updated
    socket.on("ticket_updated", (updatedTicket) => {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === updatedTicket.id
            ? updatedTicket
            : ticket
        )
      );
    });
    socket.emit("get_tickets");
    // Cleanup
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("all_tickets");
      socket.off("ticket_created");
      socket.off("ticket_locked");
      socket.off("ticket_unlocked");
      socket.off("ticket_updated");
    };

  }, []);
    // ==========================
  // Lock Ticket
  // ==========================
  const handleEdit = (ticketId) => {
    socket.emit("lock_ticket", {
      ticketId,
      lockedBy: currentUser,
    });
  };

  // ==========================
  // Save Ticket
  // ==========================
  const handleSave = (ticketId, resolution) => {
    socket.emit("save_ticket", {
      ticketId,
      resolution,
    });
  };

  // ==========================
  // Unlock Ticket
  // ==========================
  const handleClose = (ticketId) => {
    socket.emit("unlock_ticket", {
      ticketId,
    });
  };
    return (
    <main className="min-h-screen bg-gray-100 text-black">

      {/* Connection Status */}
      <ConnectionBanner connected={connected} />

      {/* Header */}
      <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            🚚 Live Ops Helpdesk
          </h1>

          <p className="text-gray-600">
            RapidDispatch Freight & Logistics
          </p>
        </div>

        {/* Agent Selector */}
        <div className="flex items-center gap-3">

          <label className="font-semibold text-black">
            Logged in as
          </label>

          <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white text-black"
          >
            <option>Agent A</option>
            <option>Agent B</option>
            <option>Agent C</option>
          </select>

        </div>

      </div>

      {/* Dashboard */}
      <div className="max-w-6xl mx-auto p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-black">
            Active Support Tickets
          </h2>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
            {tickets.length} Tickets
          </span>

        </div>

        {tickets.length === 0 ? (

          <div className="bg-white rounded-lg shadow-md p-10 text-center">

            <h2 className="text-2xl font-bold text-black">
              No Active Tickets
            </h2>

            <p className="text-gray-500 mt-2">
              Waiting for new support tickets...
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {tickets.map((ticket) => (

              <TicketCard
                key={ticket.id}
                ticket={ticket}
                currentUser={currentUser}
                onEdit={handleEdit}
                onSave={handleSave}
                onClose={handleClose}
              />

            ))}

          </div>

        )}

      </div>

    </main>
  );
}