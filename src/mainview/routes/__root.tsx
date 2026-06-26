import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/side-header";
import { Button } from "@/components/ui/button";
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
      className="h-lvh"
      open={false}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
