import { Button } from "@/components/ui/button";
import {
  Outlet,
  createRootRoute,
  useRouter,
} from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  return (
    <div>
      <header>
        <Button
          onClick={() => {
            if (router.history.canGoBack()) router.history.back();
          }}
        >
          Back
        </Button>
        <Button onClick={() => router.history.forward()}>Forwards</Button>
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
