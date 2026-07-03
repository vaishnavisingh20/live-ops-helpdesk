"use client";

import { io } from "socket.io-client";

export const socket = io(
  "https://live-ops-helpdesk-1-t7e2.onrender.com",
  {
    autoConnect: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  }
);