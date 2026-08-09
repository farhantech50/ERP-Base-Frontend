import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set, get) => ({
  socket: null,
  activeUsers: [],
  connect: (token) => {
    const existingSocket = get().socket;
    if (existingSocket) {
      existingSocket.disconnect();
    }

    const socket = io(import.meta.env.VITE_BASE_URL, {
      auth: { token },
      transports: ["websocket", "polling"], // fallbacks
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      
      // Optionally join rooms based on user role etc. here, 
      // but usually the backend can parse the token or we can emit a join event.
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("activeUsers", (users) => {
      set({ activeUsers: users });
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    set({ socket });
  },
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, activeUsers: [] });
    }
  },
}));
