import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";

export const createContext = async (opts: CreateWSSContextFnOptions) => {
  const token = opts.info.connectionParams?.token;

  // [... authenticate]

  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
