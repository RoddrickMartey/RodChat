// src/app/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (url) => {
  if (!socket) {
    socket = io(url, {
      withCredentials: true,
    });
  }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
