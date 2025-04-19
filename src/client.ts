import { createTRPCClient, createWSClient, wsLink } from "@trpc/client";
import type { AppRouter } from "./router";

async function main() {
  // create persistent WebSocket connection
  const wsClient = createWSClient({
    url: `ws://localhost:3000`,
    connectionParams: async () => {
      return {
        token: "supersecret",
      };
    },
  });
  // configure TRPCClient to use WebSockets transport
  const client = createTRPCClient<AppRouter>({
    links: [
      wsLink({
        client: wsClient,
      }),
    ],
  });

  try {
    const withoutInputQuery = await client.hello.greeting.query();
    console.log(withoutInputQuery);

    const withInputQuery = await client.hello.greeting.query({ name: "Alex" });
    console.log(withInputQuery);
  } catch (error) {
    console.error("Error:", error);
  }
}

void main();
