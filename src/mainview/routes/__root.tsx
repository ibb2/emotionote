import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/side-header";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@base-ui/react/separator";
import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, StickyNotePlus } from "lucide-react";
import { Suspense } from "react";
import { useNewNote } from "../hooks/useNewNote";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  const { createNewNote } = useNewNote();

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
            <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
              <div className="flex w-full items-center gap-1 px-2 lg:gap-2 lg:px-6">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => {
                    if (router.history.canGoBack()) router.history.back();
                  }}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => router.history.forward()}
                >
                  <ChevronRight />
                </Button>
                <Button
                  size={"icon"}
                  className="ml-auto self-end justify-self-end"
                  onClick={createNewNote}
                >
                  <StickyNotePlus />
                </Button>
              </div>
            </header>
            <div className="min-h-0 flex-1 overflow-hidden">
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </div>
          </SidebarInset>
        </ResizablePanel>
        <ResizableHandle className="bg-transparent" />
        <ResizablePanel
          defaultSize={32}
          minSize={0}
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
