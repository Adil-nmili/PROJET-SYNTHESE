import { CalendarIcon, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useClientContext } from "../../../api/context/ClientContext";

export function HoverCardClient() {

  const { logout, client } = useClientContext();

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
              <h4 className="text-sm font-semibold">{client.first_name} {client.last_name}</h4>
            </div>
            <p className="text-sm">{client.email}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {client.created_at.split("T")[0]}
              </span>
            </div>
            <Button
              variant="destructive"
              className="w-full mt-4"
              onClick={() => {
                logout();
              }} >
              Logout
              </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
