"use client";

import { useEffect, useState } from "react";

export default function TicketCard({
  ticket,
  currentUser,
  onEdit,
  onSave,
  onClose,
}) {
  const [resolution, setResolution] = useState(ticket.resolution || "");

  useEffect(() => {
    setResolution(ticket.resolution || "");
  }, [ticket.resolution]);

  // Only the agent holding the lock can edit
  const isOwner = ticket.lockedBy === currentUser;

  return (
    <div
      className={`rounded-xl border shadow-md p-6 transition-all duration-300 ${
        ticket.locked
          ? "bg-gray-200 border-gray-400"
          : "bg-white border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-black">
            Ticket #{ticket.id}
          </h2>

          <p className="text-lg font-semibold text-gray-800 mt-1">
            {ticket.title}
          </p>

        </div>

        {ticket.locked && (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg font-semibold">
            <span>🔒</span>
            <span>Locked by {ticket.lockedBy}</span>
          </div>
        )}

      </div>

      {/* Divider */}
      <hr className="my-5" />

      {/* Customer */}
      <div className="mb-3">

        <span className="font-semibold text-black">
          Customer:
        </span>

        <span className="ml-2 text-gray-700">
          {ticket.customer}
        </span>

      </div>

      {/* Status */}
      <div className="mb-5">

        <span className="font-semibold text-black">
          Status:
        </span>

        <span
          className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
            ticket.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : ticket.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {ticket.status}
        </span>

      </div>

      {/* Resolution */}
      <div>

        <label className="block mb-2 font-semibold text-black">
          Resolution
        </label>

        <textarea
          rows={5}
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          disabled={!isOwner}
          placeholder="Enter ticket resolution..."
          className={`w-full rounded-lg border p-3 text-black transition ${
            isOwner
              ? "bg-white"
              : "bg-gray-100 cursor-not-allowed"
          }`}
        />

      </div>
            {/* Buttons */}
      <div className="flex gap-4 mt-6">

        {/* Edit */}
        <button
          onClick={() => onEdit(ticket.id)}
          disabled={ticket.locked}
          className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
            ticket.locked
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Edit
        </button>

        {/* Save */}
        <button
          onClick={() => onSave(ticket.id, resolution)}
          disabled={!isOwner}
          className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
            isOwner
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Save
        </button>

        {/* Close */}
        <button
          onClick={() => onClose(ticket.id)}
          disabled={!isOwner}
          className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
            isOwner
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Close
        </button>

      </div>

    </div>
  );
}