import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import RoleDisplay from "./role-display"
import { useState } from "react"
import { BusinessType } from "@/schema";

export default function BusinessTypeSelector() {
  const [selectedType, setSelectedType] = useState<string>()
  const language = "es";
  const { data: businessTypes, isLoading, error } = useQuery<BusinessType[]>({
    queryKey: [`/api/business-types?language=${language}`],
    select: (res) => res!["data"],
  })

  if (isLoading) {
    return <div>Loading business types...</div>
  }

  if (error) {
    return <div>Error loading business types.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {businessTypes?.map((type) => (
          <Button
            key={type.businessType_key}
            variant={selectedType === type.businessType_key ? "default" : "outline"}
            className="min-h-24 h-auto text-left flex flex-col items-start p-4 w-full break-words whitespace-normal"
            onClick={() => setSelectedType(type.businessType_key)}
          >
            <span className="text-lg font-semibold w-full break-words">{type.name}</span>
            <span className="text-sm text-muted-foreground break-words">
              {type.description}
            </span>
          </Button>
        ))}
      </div>

      {selectedType && (
        <div id="role-display">
          <RoleDisplay businessTypeKey={selectedType} />
        </div>
      )}
    </div>
  )
}
