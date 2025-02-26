
import { useQuery } from "@tanstack/react-query";
import { Activity, User } from "../schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useWebSocket } from "@/lib/websocket";
import { format } from "date-fns";

export default function ActivityLog() {
  const { connected } = useWebSocket();

  const { data: activities, isLoading: loadingActivities } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  if (loadingActivities) {
    return <div>Loading activities...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Activity Log</h3>
        <Badge variant={connected ? "default" : "secondary"}>
          {connected ? "Live" : "Connecting..."}
        </Badge>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {activities?.map((activity) => {
            const user = users?.find((u) => u.id === activity.userId);
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div>
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <time className="text-sm text-muted-foreground">
                  {format(new Date(activity.timestamp), "PPp")}
                </time>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}