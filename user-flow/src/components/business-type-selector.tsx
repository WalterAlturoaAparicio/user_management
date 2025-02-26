
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import RoleDisplay from "./role-display";
import { BusinessType } from "../schema";
import { useState } from "react";

export default function BusinessTypeSelector() {
  const [selectedType, setSelectedType] = useState<number>();

  const { data: businessTypes, isLoading } = useQuery<BusinessType[]>({
    queryKey: ["/api/business-types"],
  });

  if (isLoading) {
    return <div>Loading business types...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {businessTypes?.map((type) => (
          <Button
            key={type.id}
            variant={selectedType === type.id ? "default" : "outline"}
            className="h-24 text-left flex flex-col items-start p-4"
            onClick={() => setSelectedType(type.id)}
          >
            <span className="text-lg font-semibold">{type.name}</span>
            <span className="text-sm text-muted-foreground">
              {type.description}
            </span>
          </Button>
        ))}
      </div>

      {selectedType && (
        <div id="role-display">
          <RoleDisplay businessTypeId={selectedType} />
        </div>
      )}
    </div>
  );
}