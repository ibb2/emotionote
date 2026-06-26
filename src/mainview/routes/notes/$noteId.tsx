import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { createFileRoute } from "@tanstack/react-router";
import "@blocknote/shadcn/style.css";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useEvolu, useQuery } from "@evolu/react";
import { NoteId } from "@/db/schema";
import { useEffect, useMemo, useRef } from "react";
import { Row } from "@evolu/common";
import { createQuery } from "@evolu/common/local-first";
import { electroview } from "@/mainview/rpc";
import { useTextSentimentAnalysis } from "@/mainview/hooks/useTextSentimentAnalysis";
import {
  emptyDocument,
  forgetPendingNote,
  getPendingNote,
  parseBlocks,
} from "@/mainview/lib/noteContent";

export const Route = createFileRoute("/notes/$noteId")({
  component: RouteComponent,
});

type NoteRow = Row & {
  readonly id: string;
  readonly title: string;
  readonly blocks: string;
};

const getInlineText = (content: unknown): string[] => {
  if (typeof content === "string") return [content];
  if (Array.isArray(content)) return content.flatMap(getInlineText);
  if (!content || typeof content !== "object") return [];

  const maybeText = (content as { text?: unknown }).text;
  return typeof maybeText === "string" ? [maybeText] : [];
};

const getDocumentText = (
  blocks: readonly {
    content?: unknown;
  }[],
): string =>
  blocks
    .flatMap((block) => getInlineText(block.content))
    .join(" ")
    .trim();

function RouteComponent() {
  const { noteId } = Route.useParams();
  const { resolvedTheme } = useTheme();

  const { update } = useEvolu();

  const editor = useCreateBlockNote({
    initialContent: emptyDocument,
  });

  const {
    analyzeText,
    error: sentimentError,
    isLoading: isAnalyzingSentiment,
    sentiment,
  } = useTextSentimentAnalysis();

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
  const pendingNote = getPendingNote(noteId);
  const editorNote = note ?? pendingNote;
  const loadedNoteRef = useRef<{ id: string; blocks: string } | null>(null);

  useEffect(() => {
    if (
      !editorNote ||
      editorNote.id !== noteId ||
      (loadedNoteRef.current?.id === editorNote.id &&
        loadedNoteRef.current.blocks === editorNote.blocks)
    ) {
      return;
    }

    editor.replaceBlocks(editor.document, parseBlocks(editorNote.blocks));
    loadedNoteRef.current = { id: editorNote.id, blocks: editorNote.blocks };
  }, [editor, editorNote, noteId]);

  useEffect(() => {
    if (note?.id === noteId) {
      forgetPendingNote(note.id);
    }
  }, [note, noteId]);

  const save = () => {
    const id = NoteId.from(noteId);
    if (!id.ok) return;

    const result = update("_note", {
      id: id.value,
      title: editorNote?.title ?? noteId,
      blocks: JSON.stringify(editor.document),
    });

    if (result.ok) {
      console.log("Saved");
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0">
        <div>{editorNote ? editorNote.title : `Note ${noteId} not found`}</div>
        <Button onClick={save}>Save</Button>
        <Button
          onClick={() => {
            electroview.rpc?.send.logInBackend({
              message: `Log from note ${noteId}`,
            });
          }}
        >
          Log in Backend
        </Button>
        <Button
          disabled={isAnalyzingSentiment}
          onClick={() => void analyzeText(getDocumentText(editor.document))}
        >
          {isAnalyzingSentiment ? "Analyzing..." : "Analyze Emotion"}
        </Button>
        <div>
          {sentiment
            ? `Emotion: ${sentiment.label} (${Math.round(
                sentiment.score * 100,
              )}%)`
            : "Emotion: Not analyzed"}
        </div>
        {sentimentError ? <div>{sentimentError}</div> : null}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <BlockNoteView
          editor={editor}
          theme={resolvedTheme}
          data-theming-css-variables
        />
      </div>
    </div>
  );
}
