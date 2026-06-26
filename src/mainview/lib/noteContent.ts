import { PartialBlock } from "@blocknote/core";

export type NoteContent = {
  readonly id: string;
  readonly title: string;
  readonly blocks: string;
};

export const emptyDocument: PartialBlock[] = [{ type: "paragraph", content: "" }];

const pendingNotes = new Map<string, NoteContent>();

export const createDefaultNoteBlocks = (id: string): PartialBlock[] => [
  { type: "heading", content: id },
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
];

export const serializeBlocks = (blocks: PartialBlock[]): string =>
  JSON.stringify(blocks);

export const parseBlocks = (blocks: string): PartialBlock[] => {
  try {
    const parsed = JSON.parse(blocks);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : emptyDocument;
  } catch {
    return emptyDocument;
  }
};

export const rememberPendingNote = (note: NoteContent) => {
  pendingNotes.set(note.id, note);
};

export const getPendingNote = (id: string): NoteContent | undefined =>
  pendingNotes.get(id);

export const forgetPendingNote = (id: string) => {
  pendingNotes.delete(id);
};
