import { RPCSchema } from "electrobun";

export type MyWebviewRPCType = {
  bun: RPCSchema<{
    messages: {
      logInBackend: {
        message: string;
      };
    };
  }>;
  webview: RPCSchema;
};
