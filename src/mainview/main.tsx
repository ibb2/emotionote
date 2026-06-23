import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { routeTree } from "./routeTree.gen";
import { evoluReactWebDeps } from "@evolu/react-web";
import { createEvolu, SimpleName } from "@evolu/common";

import { Schema } from "@/mainview/db/schema";
import { EvoluContext } from "@evolu/react";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const evolu = createEvolu(evoluReactWebDeps)(Schema, {
  name: SimpleName.orThrow("emotionote"),
  // transports: [{ type: "WebSocket", url: "wss://your-sync-url" }], // optional, defaults to free.evoluhq.com
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EvoluContext.Provider value={evolu}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </EvoluContext.Provider>
  </StrictMode>,
);
