import React, { useState } from "react";
import PlayersTable from "@/components/Partials/PlayersTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PLAYERS_CREATE } from "@/router/Router";
const Players = () => {
  const [filter, setFilter] = useState("");
  return (
    <div className="  m-4 border-1 border-slate-300 rounded-md bg-white dark:bg-slate-950 p-4 min-h-screen dark:border-slate-700">
      <h1 className="text-xl font-bold text-black dark:text-white">Players Management</h1>
      <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">Search for a player by name, nickname, or birth place</p>
      <div className="mb-4 relative flex items-center justify-between ">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, nickname, or birth place..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full max-w-md pl-8 bg-transparent dark:text-white border-slate-700"
        />
        <Link to={PLAYERS_CREATE}>
          <Button variant="default">Add Player</Button>
        </Link>
      </div>
      <PlayersTable filter={filter} />
    </div>
  );
};

export default Players;
