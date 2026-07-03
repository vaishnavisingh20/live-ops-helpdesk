"use client";

import TicketCard from "./TicketCard";

export default function TicketBoard({
  tickets,
  currentUser,
  onEdit,
}) {
  return (
    <div>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          currentUser={currentUser}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}