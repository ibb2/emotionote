import { createQuery, type Row } from "@evolu/common/local-first";
import { useQuery } from "@evolu/react";
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

  const notes = useQuery(allNotes);

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
