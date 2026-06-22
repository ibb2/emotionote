import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";

function App() {
  const editor = useCreateBlockNote();
  const { resolvedTheme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center justify-end border-b border-border px-4">
        <ModeToggle />
      </header>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme}
        className="min-h-[calc(100vh-3.5rem)] flex-1 bg-background text-foreground"
        shadCNComponents={
          {
            // Pass modified ShadCN components from your project here.
            // Otherwise, the default ShadCN components will be used.
          }
        }
      />
    </main>
  );
}

export default App;
