import { createQuery, type Row } from "@evolu/common/local-first";
import { useQuery } from "@evolu/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";

type NoteListRow = Row & {
  readonly id: string;
  readonly title: string;
  readonly createdAt: string;
};

const allNotes = createQuery<NoteListRow>((db) =>
  db.selectFrom("_note").select(["id", "title", "createdAt"]),
);

export const Route = createFileRoute("/")({
  component: Index,
});

let options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

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
    <div className="h-full overflow-y-auto px-4">
      <div>
        {notes.map((note) => (
          <Item
            key={note.id}
            onClick={() => openNote(note.id)}
            className="hover:bg-zinc-200/30 dark:hover:bg-zinc-800/70"
          >
            <ItemContent>
              <ItemTitle>{note.title}</ItemTitle>
              <ItemDescription>
                {new Intl.DateTimeFormat(undefined, options).format(
                  new Date(note.createdAt),
                )}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </div>
    </div>
  );
}
