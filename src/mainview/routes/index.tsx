import { Button } from "@/components/ui/button";
import { createQuery, type Row } from "@evolu/common/local-first";
import { useEvolu, useQuery } from "@evolu/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

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
    const result = insert("_note", {
      title: "Untitled note",
      blocks: JSON.stringify([{ type: "paragraph", content: "" }]),
    });

    if (result.ok) {
      void router.navigate({
        to: "/notes/$noteId",
        params: { noteId: result.value.id },
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
    <div>
      <p>Homepage</p>
      <Button onClick={createNote}>New note</Button>
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
