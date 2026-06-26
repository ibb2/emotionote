import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sidecar/insights")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/sidecar/insights"!</div>;
}
