import { Button } from "@/components/ui/button";
import { createQuery, type Row } from "@evolu/common/local-first";
import { useEvolu, useQuery } from "@evolu/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { nanoid } from "nanoid";

type NoteListRow = Row & {
  readonly id: string;
  readonly title: string;
};

const allNotes = createQuery<NoteListRow>((db) =>
  db.selectFrom("_note").select(["id", "title"]),
);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const router = useRouter();
  const { insert } = useEvolu();

  const notes = useQuery(allNotes);
  const createNote = () => {
    const id = nanoid();

    const result = insert("_note", {
      title: id + " note",
      blocks: JSON.stringify([
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
      ]),
    });

    if (result.ok) {
      void router.navigate({
        to: "/notes/$noteId",
        params: { noteId: id },
      });
    }
  };

  const openNote = (id: string) => {
    router.navigate({
      to: "/notes/$noteId",
      params: { noteId: id },
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div>
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border-1 border-red-100 p-4"
              onClick={() => openNote(note.id)}
            >
              <p>{note.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
