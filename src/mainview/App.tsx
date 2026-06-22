import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

import { useTheme } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Open up a menu or toolbar to see more of the red theme",
      },
      {
        type: "paragraph",
        content:
          "Toggle light/dark mode in the page footer and see the theme change too",
      },
    ],
  });

  const { resolvedTheme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center justify-end px-4">
        <ModeToggle />
      </header>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme}
        data-theming-css-variables
      />
    </main>
  );
}

export default App;
