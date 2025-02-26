
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, UserCircle, LogOut, LineChart } from "lucide-react";

export default function NavSidebar() {
  const [location] = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      adminOnly: true,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: LineChart,
      adminOnly: true,
    },
    {
      name: "Actions",
      href: "/actions",
      icon: UserCircle,
      adminOnly: false,
    },
  ];

  return (
    <div className="h-screen w-64 border-r bg-sidebar">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          User Management
        </h2>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2 p-4">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  location === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="absolute bottom-4 left-4 right-4">
        <Link href="/">
          <Button variant="outline" className="w-full gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}