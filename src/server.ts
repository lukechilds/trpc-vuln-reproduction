// Implements WebSockets based on:
// https://web.archive.org/web/20250419150818/https://trpc.io/docs/server/websockets

import { appRouter } from "./router";
import { createContext } from "./context";

import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";

async function main() {
  const wss = new WebSocketServer({
    port: 3000,
  });
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext,
    onError: (err) => {
      console.error(err);
    },
    // Enable heartbeat messages to keep connection open (disabled by default)
    keepAlive: {
      enabled: true,
      // server ping message interval in milliseconds
      pingMs: 30000,
      // connection is terminated if pong message is not received in this many milliseconds
      pongWaitMs: 5000,
    },
  });
  wss.on("connection", (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once("close", () => {
      console.log(`➖➖ Connection (${wss.clients.size})`);
    });
  });
  console.log("✅ WebSocket Server listening on ws://localhost:3000");
  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
    wss.close();
  });
}

void main();
