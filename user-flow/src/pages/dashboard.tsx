import { useQuery } from "@tanstack/react-query";
import NavSidebar from "@/components/nav-sidebar";
import ActivityLog from "@/components/activity-log";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, AuditLog } from "../schema";

export default function Dashboard() {
  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: activities, isLoading: loadingActivities } = useQuery<AuditLog[]>({
    queryKey: ["/api/activities"],
  });

  return (
    <div className="min-h-screen bg-background flex">
      <NavSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">{users?.length || 0}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Users Today</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingActivities ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">
                  {new Set(activities?.filter(a => 
                    new Date(a.timestamp).toDateString() === new Date().toDateString()
                  ).map(a => a.userId)).size}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingActivities ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">{activities?.length || 0}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityLog />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
