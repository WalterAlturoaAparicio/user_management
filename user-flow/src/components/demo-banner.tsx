
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DemoBanner() {
  return (
    <Alert className="fixed top-0 left-0 right-0 rounded-none border-t-0 border-x-0">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        You&apos;re currently in Demo Mode. All actions are simulated.
      </AlertDescription>
    </Alert>
  );
}
