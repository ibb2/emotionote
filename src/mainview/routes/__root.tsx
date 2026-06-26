import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/side-header";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
          "--header-height": "3rem",
        } as React.CSSProperties
      }
      className="h-full min-h-0 overflow-hidden"
      open={false}
    >
      <AppSidebar variant="inset" />
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 min-w-0 flex-1"
      >
        <ResizablePanel
          defaultSize={55}
          minSize={30}
          className="flex min-h-0 min-w-0"
        >
          <SidebarInset className="min-h-0 overflow-hidden md:ml-2">
            <div>
              <Button
                onClick={() => {
                  if (router.history.canGoBack()) router.history.back();
                }}
              >
                Back
              </Button>
              <Button onClick={() => router.history.forward()}>Forward</Button>
            </div>
            <SiteHeader />
            <div className="min-h-0 flex-1 overflow-hidden">
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </div>
          </SidebarInset>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={45}
          minSize={25}
          className="flex min-h-0 min-w-0"
        >
          <SidebarInset className="min-h-0 overflow-hidden">
            <div className="min-h-0 flex-1 overflow-auto">
              <p>Emotional Insights</p>
            </div>
          </SidebarInset>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
}
