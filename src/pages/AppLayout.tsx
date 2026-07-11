import { Outlet, createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./RootLayout";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function AppLayoutComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <ProtectedRoute />
        </main>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  id: "_app",
  component: AppLayoutComponent,
});
