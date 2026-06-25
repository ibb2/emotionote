import { type MyWebviewRPCType } from "@/shared/types";
import { Electroview } from "electrobun/view";

const rpc = Electroview.defineRPC<MyWebviewRPCType>({
  handlers: {},
});

export const electroview = new Electroview({ rpc });
