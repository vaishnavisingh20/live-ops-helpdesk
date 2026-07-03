# Live Ops Helpdesk

A real-time collaborative support ticket dashboard built for **RapidDispatch Freight & Logistics**.

## Project Overview

RapidDispatch manages thousands of freight deliveries every day. When a truck breaks down or a delivery is missed, a support ticket is generated.

This project solves the problem of multiple support agents editing the same ticket simultaneously by implementing **real-time ticket locking** using **Socket.io**.

When one agent begins editing a ticket, all other connected agents instantly see that the ticket has been locked. This prevents conflicting updates and accidental overwrites.

---

## Features

### Live Ticket Dashboard

* Displays all active support tickets.
* Tickets are synchronized in real time.
* No polling or page refreshes.

### Real-Time Ticket Locking

* Clicking **Edit** locks the ticket.
* Other connected agents immediately see:

  * 🔒 Lock icon
  * Gray ticket card
  * "Locked by Agent"
  * Disabled Edit button

### Unlock Workflow

* Clicking **Save** or **Close** unlocks the ticket.
* All connected clients update instantly.

### Connection Status

* Detects WebSocket disconnections.
* Displays a warning banner:

```
Connection Lost: Reconnecting...
```

* Automatically reconnects when the connection is restored.

---

# Tech Stack

## Frontend

* Next.js 16
* React 19
* Tailwind CSS
* Socket.io Client

## Backend

* Node.js
* Express
* Socket.io
* CORS

---

# Folder Structure

```
live-ops-helpdesk/

├── backend/
│   ├── server.js
│   ├── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    ├── package.json
```

---

# Installation

## Backend

Navigate to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Start the backend server.

```bash
node server.js
```

The backend runs on:

```
http://localhost:5000
```

---

## Frontend

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend runs on:

```
http://localhost:3000
```

---

# How to Test

Open two browser windows side by side.

Window 1

* Select **Agent A**

Window 2

* Select **Agent B**

Both windows connect to the same Socket.io server.

### Lock Demonstration

1. Agent A clicks **Edit**.
2. Agent B instantly sees:

   * Gray ticket
   * 🔒 Locked by Agent A
   * Disabled Edit button

### Unlock Demonstration

1. Agent A clicks **Save** or **Close**.
2. Agent B immediately sees the ticket become editable again.

---

# Socket Events

| Event           | Description                     |
| --------------- | ------------------------------- |
| all_tickets     | Sends all active tickets        |
| lock_ticket     | Requests a ticket lock          |
| ticket_locked   | Broadcasts locked ticket        |
| unlock_ticket   | Releases a lock                 |
| ticket_unlocked | Broadcasts unlocked ticket      |
| save_ticket     | Saves ticket resolution         |
| ticket_updated  | Broadcasts updated ticket       |
| create_ticket   | Broadcasts newly created ticket |

---

# Business Problem Solved

Without ticket locking, multiple support agents could overwrite each other's work while resolving the same issue.

This implementation introduces real-time collaborative editing where only one support agent can edit a ticket at a time, preventing race conditions and reducing operational errors.

---

# Future Improvements

* User authentication
* Database integration (MongoDB/PostgreSQL)
* Ticket search and filtering
* Agent presence indicators
* Ticket priority levels
* Activity history
* Audit logs
* Role-based permissions

---

