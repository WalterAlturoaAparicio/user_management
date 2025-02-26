
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Role } from "../schema";

interface RoleDisplayProps {
  businessTypeId: number;
}

export default function RoleDisplay({ businessTypeId }: RoleDisplayProps) {
  const { data: roles, isLoading } = useQuery<Role[]>({
    queryKey: ["/api/business-types", businessTypeId, "roles"],
  });

  if (isLoading) {
    return <div>Loading roles...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {roles?.map((role) => (
            <Card key={role.id}>
              <CardHeader>
                <CardTitle className="text-lg">{role.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Permissions:</div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
