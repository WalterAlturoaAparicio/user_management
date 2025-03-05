import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Role } from "../schema"

interface RoleDisplayProps {
  businessTypeKey: string
}

export default function RoleDisplay({ businessTypeKey }: RoleDisplayProps) {
  const language = "es"

  const {
    data: roles,
    isLoading,
    error,
  } = useQuery<Role[]>({
    queryKey: [
      `/api/roles?language=${language}&businessTypeKey=${businessTypeKey}`,
    ],
    select: (res) => res!["data"],
  })

  if (isLoading) {
    return <div>Loading roles...</div>
  }

  if (error) {
    return <div>Error loading business types.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {roles?.map((role) => (
            <Card key={role.role_id}>
              <CardHeader>
                <CardTitle className="text-lg">{role.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Permissions:</div>
                  {role.permissions && role.permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission) => (
                        <Badge
                          key={`permission-${permission.id}`}
                          variant="secondary"
                        >
                          {permission.description}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">
                      No permissions assigned
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
