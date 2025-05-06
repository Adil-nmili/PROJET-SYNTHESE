import { CalendarIcon, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverCardUser({ admin }) {
  console.log(admin)
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <User />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4 w-full">
            <div className="space-y-1 w-full">
            <div className="flex items-center justify-between gap-2 w-full">
              <h4 className="text-sm font-semibold">
                {admin.first_name} {admin.last_name}
              </h4>
              <h3 className="text-sm font-semibold uppercase underline text-blue-500">{admin.role}</h3>
            </div>
            <p className="text-sm">{admin.email}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {admin.created_at.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
