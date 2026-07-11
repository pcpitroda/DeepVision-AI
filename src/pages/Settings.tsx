import { createRoute } from "@tanstack/react-router";
import { Route as appLayoutRoute } from "./AppLayout";
import { useState } from "react";
import { Save, User, Bell, Key, Shield } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("Settings saved successfully");
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <User className="h-4 w-4" /> Profile
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "notifications" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "api" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <Key className="h-4 w-4" /> API Keys
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "security" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <Shield className="h-4 w-4" /> Security
          </button>
        </aside>

        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile Details</h3>
                <p className="text-sm text-muted-foreground">Update your personal information.</p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <input id="name" defaultValue="John Doe" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <input id="email" type="email" defaultValue="john@example.com" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isSaving ? <span className="animate-spin mr-2">⏳</span> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">API Keys</h3>
                <p className="text-sm text-muted-foreground">Manage your secret keys for API access.</p>
              </div>
              <div className="rounded-md border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Production Key</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">pk_live_********************a8f</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">Reveal</button>
                </div>
                <div className="h-px bg-border w-full" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Test Key</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">pk_test_********************2c9</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">Reveal</button>
                </div>
              </div>
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                Generate New Key
              </button>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "security") && (
            <div className="flex items-center justify-center h-48 border border-dashed rounded-lg">
              <p className="text-muted-foreground text-sm">This section is under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: Settings,
});
