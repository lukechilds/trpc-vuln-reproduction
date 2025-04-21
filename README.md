# tRPC 11 WebSocket Vulnerability Report

This repo includes an example tRPC 11 WebSocket server and proof of concept vulnerability. It's based on the `express-minimal` example from [here](https://github.com/trpc/trpc/tree/8cef54eaf95d8abc8484fe1d454b6620eeb57f2f/examples/express-minimal) and then has the suggested WebSocket configuration applied from [here](https://web.archive.org/web/20250419150818/https://trpc.io/docs/server/websockets).

Any tRPC 11 server with WebSocket enabled with a `createContext` method set is vulnerable. Here is an example:

https://github.com/user-attachments/assets/ce1b2d32-6103-4e54-8446-51535b293b05
