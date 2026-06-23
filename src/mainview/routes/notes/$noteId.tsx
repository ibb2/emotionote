import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { createFileRoute } from "@tanstack/react-router";
import "@blocknote/shadcn/style.css";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notes/$noteId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { noteId } = Route.useParams();
  const { resolvedTheme } = useTheme();
  const editor = useCreateBlockNote({
    initialContent: [
      { type: "heading", content: noteId },
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

  return (
    <div>
      <div>Hello `/notes/${noteId}`!</div>
      <Button>Save</Button>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme}
        data-theming-css-variables
      />
    </div>
  );
}
