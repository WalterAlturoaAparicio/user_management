import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import NavSidebar from "@/components/nav-sidebar";
import { AuditLog, User, BusinessType } from "../schema";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export default function Analytics() {
  const { data: aiInsights, isLoading: loadingInsights } = useQuery<{ insights: string[] }>({
    queryKey: ["/api/insights"],
  });

  const { data: activities } = useQuery<AuditLog[]>({
    queryKey: ["/api/activities"],
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: businessTypes } = useQuery<BusinessType[]>({
    queryKey: ["/api/business-types"],
  });

  // Calculate activity by date
  const activityByDate = activities?.reduce((acc, activity) => {
    const date = format(new Date(activity.timestamp), "MM/dd");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const activityData = Object.entries(activityByDate || {}).map(([date, count]) => ({
    date,
    activities: count,
  }));

  // Calculate actions distribution
  const actionDistribution = activities?.reduce((acc, activity) => {
    acc[activity.action] = (acc[activity.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(actionDistribution || {}).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate users per business type
  const usersPerBusinessType = users?.reduce((acc, user) => {
    acc[user.role.businessType.id] = (acc[user.role.businessType.id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const businessTypeData = businessTypes?.map(type => ({
    name: type.name,
    users: usersPerBusinessType?.[type.id] || 0,
  }));

  return (
    <div className="min-h-screen bg-background flex">
      <NavSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Automatically generated insights from your dashboard metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingInsights ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : (
                <ul className="space-y-2 list-disc list-inside">
                  {aiInsights?.insights.map((insight, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {insight}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{users?.length || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activities?.length || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Types</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{businessTypes?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activities" fill="var(--chart-1)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Action Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users per Business Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={businessTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="var(--chart-2)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}