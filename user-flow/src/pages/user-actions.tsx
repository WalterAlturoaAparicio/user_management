import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavSidebar from "@/components/nav-sidebar";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { User } from "../schema";

export default function UserActions() {
  const { toast } = useToast();

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/users/current"],
  });

  const actionMutation = useMutation({
    mutationFn: async (action: string) => {
      return await apiRequest("POST", "/api/activities", {
        userId: currentUser?.id,
        action,
        timestamp: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Action logged",
        description: "Your action has been recorded",
      });
    },
  });

  const getActionsByRole = (roleId: number) => {
    switch (roleId) {
      case 2: // Customer
        return [
          "Browse Products",
          "Add to Cart",
          "Place Order",
          "View Order History",
        ];
      case 3: // Delivery Person
        return [
          "View Assigned Deliveries",
          "Update Delivery Status",
          "Mark Delivery Complete",
        ];
      default:
        return [];
    }
  };

  if (!currentUser) {
    return null;
  }

  const actions = getActionsByRole(currentUser.role.id);

  return (
    <div className="min-h-screen bg-background flex">
      <NavSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Available Actions</h1>

        <Card>
          <CardHeader>
            <CardTitle>Your Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {actions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  className="h-24 text-lg"
                  onClick={() => actionMutation.mutate(action)}
                  disabled={actionMutation.isPending}
                >
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
