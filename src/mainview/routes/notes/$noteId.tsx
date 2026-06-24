import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { createFileRoute } from "@tanstack/react-router";
import "@blocknote/shadcn/style.css";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useEvolu, useQuery } from "@evolu/react";
import { NoteId } from "@/mainview/db/schema";
import { useEffect, useMemo, useRef } from "react";
import { PartialBlock } from "@blocknote/core";
import { Row } from "@evolu/common";
import { createQuery } from "@evolu/common/local-first";

export const Route = createFileRoute("/notes/$noteId")({
  component: RouteComponent,
});

type NoteRow = Row & {
  readonly id: string;
  readonly title: string;
  readonly blocks: string;
};

const emptyDocument: PartialBlock[] = [{ type: "paragraph", content: "" }];

const parseBlocks = (blocks: string): PartialBlock[] => {
  try {
    const parsed = JSON.parse(blocks);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : emptyDocument;
  } catch {
    return emptyDocument;
  }
};

function RouteComponent() {
  const { noteId } = Route.useParams();
  const { resolvedTheme } = useTheme();

  const { update } = useEvolu();

  const editor = useCreateBlockNote({
    initialContent: emptyDocument,
  });

  const noteQuery = useMemo(
    () =>
      createQuery<NoteRow>((db) =>
        db
          .selectFrom("_note")
          .where("id", "==", noteId)
          .select(["id", "title", "blocks"]),
      ),
    [noteId],
  );
  const note = useQuery(noteQuery)[0];
  const loadedNoteIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!note || loadedNoteIdRef.current === note.id) return;

    editor.replaceBlocks(editor.document, parseBlocks(note.blocks));
    loadedNoteIdRef.current = note.id;
  }, [editor, note]);

  const save = () => {
    const id = NoteId.from(noteId);
    if (!id.ok) return;

    const result = update("_note", {
      id: id.value,
      title: note?.title ?? noteId,
      blocks: JSON.stringify(editor.document),
    });

    if (result.ok) {
      console.log("Saved");
    }
  };

  return (
    <div>
      <div>{note ? note.title : `Note ${noteId} not found`}</div>
      <Button onClick={save}>Save</Button>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme}
        data-theming-css-variables
      />
    </div>
  );
}
