import { useEvolu } from "@evolu/react";
import { useRouter } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import { useState } from "react";
import {
  createDefaultNoteBlocks,
  rememberPendingNote,
  serializeBlocks,
} from "@/mainview/lib/noteContent";

export const useNewNote = () => {
  const router = useRouter();

  const { insert } = useEvolu();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewNote = () => {
    setIsLoading(true);
    setError(null);

    const draftId = nanoid();
    const title = draftId + " note";
    const blocks = serializeBlocks(createDefaultNoteBlocks(draftId));

    const result = insert("_note", {
      title,
      blocks,
    });

    if (result.ok) {
      const id = result.value.id;

      rememberPendingNote({ id, title, blocks });
      setIsLoading(false);

      return router.navigate({
        to: "/notes/$noteId",
        params: { noteId: id },
      });
    }

    setIsLoading(false);
    setError(String(result.error));
  };

  return { isLoading, error, createNewNote };
};
