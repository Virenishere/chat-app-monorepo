import http from "http";
import { SocketService } from "./services/socket";
import dotenv from "dotenv";

dotenv.config();

async function init() {
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 8000;

  SocketService(httpServer); // Attach WebSocket logic

  httpServer.listen(PORT, () =>
    console.log(`🚀 Server running at ws://localhost:${PORT}`)
  );
}

init();
