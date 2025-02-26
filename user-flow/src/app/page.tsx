"use client";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
// import { WebSocketProvider } from "../lib/websocket";
import { Toaster } from "@/components/ui/toaster";
import DemoBanner from "@/components/demo-banner";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";
import UserActions from "@/pages/user-actions";
import { useQuery } from "@tanstack/react-query";
import { User } from "../schema";

function Router() {
  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/users/current"],
  });

  const isDemoMode = currentUser?.username === "admin";

  return (
    <>
      {isDemoMode && <DemoBanner />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/actions" component={UserActions} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <WebSocketProvider> */}
        <Router />
        <Toaster />
      {/* </WebSocketProvider> */}
    </QueryClientProvider>
  );
}

export default App;