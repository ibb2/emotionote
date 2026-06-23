import { Button } from "@/components/ui/button";
import {
  Outlet,
  createRootRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  const navigate = useNavigate();

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
      <Outlet />
    </div>
  );
}
