import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import BusinessTypeSelector from "@/components/business-type-selector"
import Tutorial from "@/components/tutorial"
// import { useMutation } from "@tanstack/react-query"
// import { useToast } from "@/hooks/use-toast"
// import { apiRequest } from "@/lib/queryClient"
import { useRouter } from "next/router"

export default function Home() {
  // const { toast } = useToast()
  const router = useRouter()

  // const demoLoginMutation = useMutation({
  //   mutationFn: async () => {
  //     const res = await apiRequest("POST", "/api/auth/demo-login", {})
  //     return res.json()
  //   },
  //   onSuccess: (data) => {
  //     toast({
  //       title: "Demo Mode Active",
  //       description: "You're now exploring the system in demo mode",
  //     })
  //     router.push(data.role.id === 1 ? "/dashboard" : "/actions")
  //   },
  //   onError: () => {
  //     toast({
  //       variant: "destructive",
  //       title: "Demo Login Failed",
  //       description: "Unable to start demo mode. Please try again.",
  //     })
  //   },
  // })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            User Management System
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a business type to get started with role-based access
            management
          </p>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Select Business Type</CardTitle>
            <CardDescription>
              Choose your business type to see available roles and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div id="business-type-selector">
              <BusinessTypeSelector />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="lg"
            id="login-button"
            onClick={() => router.push("/login")}
          >
            Login to System
          </Button>
          {/* <Button
            size="lg"
            variant="secondary"
            onClick={() => demoLoginMutation.mutate()}
            disabled={demoLoginMutation.isPending}
          >
            {demoLoginMutation.isPending ? "Starting Demo..." : "Try Demo"}
          </Button> */}
        </div>
      </div>

      <Tutorial />
    </div>
  )
}
