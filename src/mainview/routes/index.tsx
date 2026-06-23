import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { nanoid } from "nanoid";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const router = useRouter();

  return (
    <div>
      <p>Homepage</p>
      <Button
        onClick={() =>
          router.navigate({
            to: `/notes/${nanoid()}`,
          })
        }
      >
        New note
      </Button>
    </div>
  );
}
