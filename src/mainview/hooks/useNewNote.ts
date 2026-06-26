import { err } from "@evolu/common";
import { useEvolu } from "@evolu/react";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import { useState } from "react";

export const useNewNote = () => {
  const router = useRouter();

  const { insert } = useEvolu();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewNote = () => {
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

    console.log("Hello");

    if (result.ok) {
      return router.navigate({
        to: "/notes/$noteId",
        params: { noteId: id },
      });
    }
  };
  return { isLoading, error, createNewNote };
};
