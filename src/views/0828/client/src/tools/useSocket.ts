import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import { onUnmounted } from "vue";

export default function useSocket(): {
  socket: Socket;
} {
  const socket = io("http://localhost:3000/", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connect to server");
  });

  onUnmounted(() => {
    socket.close();
  });

  return {
    socket,
  };
}
