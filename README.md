# tRPC 11 WebSocket Vulnerability Report

This repo includes an example tRPC 11 WebSocket server and proof of concept vulnerability. It's based on the `express-minimal` example from [here](https://github.com/trpc/trpc/tree/8cef54eaf95d8abc8484fe1d454b6620eeb57f2f/examples/express-minimal) and then has the suggested WebSocket configuration applied from [here](https://web.archive.org/web/20250419150818/https://trpc.io/docs/server/websockets).

Any tRPC 11 server with WebSocket enabled with a `createContext` method set is vulnerable. Here is an example:

https://github.com/user-attachments/assets/ce1b2d32-6103-4e54-8446-51535b293b05

The connectionParams logic introduced in https://github.com/trpc/trpc/pull/5839 does not safely handle invalid connectionParams objects. During validation if the object does not match an expected shape an error will be thrown:

https://github.com/trpc/trpc/blob/8cef54eaf95d8abc8484fe1d454b6620eeb57f2f/packages/server/src/unstable-core-do-not-import/http/parseConnectionParams.ts#L27-L33

This is called during WebSocket connection setup inside `createCtxPromise()` here:

https://github.com/trpc/trpc/blob/8cef54eaf95d8abc8484fe1d454b6620eeb57f2f/packages/server/src/adapters/ws.ts#L435

`createCtxPromise` has handling to catch any errors and pass them up to the `opts.onError` handler:

https://github.com/trpc/trpc/blob/8cef54eaf95d8abc8484fe1d454b6620eeb57f2f/packages/server/src/adapters/ws.ts#L144-L173

However the error handler then rethrows the error:

https://github.com/trpc/trpc/blob/8cef54eaf95d8abc8484fe1d454b6620eeb57f2f/packages/server/src/adapters/ws.ts#L171

Since this is all triggered from the WebSocket `message` event there is no higher level error handling so this causes an uncaught exception and crashes the server process.
