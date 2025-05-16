import { WebSocketServer, WebSocket, RawData } from "ws";
import { Server as HTTPServer } from "http";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const pub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

const sub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});


let userCount = 0;
const userMap = new Map<WebSocket, string>();

export const SocketService = (server: HTTPServer): void => {
  const wss = new WebSocketServer({ server });

  // Subscribe to Redis chat channel
  sub.subscribe("chat");

  // When a message is published to Redis, broadcast it to all WebSocket clients
  sub.on("message", (_channel, message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket connection
  wss.on("connection", (ws: WebSocket) => {
    userCount++;
    const username = `User ${userCount}`;
    userMap.set(ws, username);

    console.log(`✅ ${username} connected`);
    ws.send(`🎉 Welcome, ${username}!`);

    pub.publish("chat", `🔔 ${username} has joined the chat.`);

    ws.on("message", (message: RawData) => {
      const text = message.toString();
      console.log(`📨 ${username}: ${text}`);

      // Publish message to Redis
      pub.publish("chat", `${username}: ${text}`);
    });

    ws.on("close", () => {
      console.log(`❌ ${username} disconnected`);
      userMap.delete(ws);

      pub.publish("chat", `🚪 ${username} has left the chat.`);
    });
  });
};
