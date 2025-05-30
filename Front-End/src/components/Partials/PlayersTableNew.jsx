import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'react-hot-toast';
import { NewsService } from '../../../service/newsService';

export default function PlayersTableNew() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [teams, setTeams] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await NewsService.getPlayerStats();
      if (response.status === 200) {
        const playersData = response.data;
        console.log('Players Data:', playersData);
        
        setPlayers(playersData);
        setFilteredPlayers(playersData);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      toast.error('Error fetching players');
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await NewsService.getTeams();
      if (response.status === 200) {
        const teamsData = response.data;
        setTeams(teamsData);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Error fetching teams');
    }
  };

  useEffect(() => {
    filterPlayers();
  }, [searchQuery, selectedTeam]);

  const filterPlayers = () => {
    let filtered = [...players];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by team
    if (selectedTeam !== 'all') {
      filtered = filtered.filter(player => player.team === selectedTeam);
    }

    setFilteredPlayers(filtered);
  };

  const handleDelete = async (playerId) => {
    setDeleteLoading(true);
    try {
      const response = await NewsService.deletePlayer(playerId);
      if (response.status === 200) {
        toast.success('Player deleted successfully');
        setPlayers(prev => prev.filter(player => player._id !== playerId));
        setFilteredPlayers(prev => prev.filter(player => player._id !== playerId));
      }
    } catch (error) {
      toast.error('Error deleting player');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <form className='relative'>
            <Input 
              placeholder='Search for a Player...' 
              className='placeholder:text-s pr-13'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className='absolute top-0 right-0' variant={'outline'}>
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex gap-4">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table Display */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Rebounds</TableHead>
                  <TableHead>Assists</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player._id}>
                    <TableCell>
                      <img 
                        src={`${import.meta.env.VITE_BACKEND_URL}/storage/${player.image}`} 
                        alt={player.name} 
                        className="w-10 h-10 object-contain rounded-full"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>{player.points}</TableCell>
                    <TableCell>{player.rebounds}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size='sm' onClick={() => setSelectedPlayer(player)}>
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[1000px] max-w-[1000px]">
                            <div className="p-4">
                              <h2 className="text-2xl font-bold mb-4">Player Details</h2>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Player Information</h3>
                                  <div className="space-y-2">
                                    <p><span className="font-medium">Name:</span> {player.name}</p>
                                    <p><span className="font-medium">Position:</span> {player.position}</p>
                                    <p><span className="font-medium">Team:</span> {player.team}</p>
                                    <p><span className="font-medium">Points:</span> {player.points}</p>
                                    <p><span className="font-medium">Rebounds:</span> {player.rebounds}</p>
                                    <p><span className="font-medium">Assists:</span> {player.assists}</p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">Player Photo</h3>
                                  <img 
                                    src={`${import.meta.env.VITE_API_URL}/storage/${player.image}`} 
                                    alt={player.name} 
                                    className="w-48 h-48 object-contain rounded-lg"
                                  />
                                </div>
                              </div>
                              {player.description && (
                                <div className="mt-4">
                                  <h3 className="font-semibold mb-2">Description</h3>
                                  <p className="text-gray-600">{player.description}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              disabled={deleteLoading}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to delete this player?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the player
                                and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(player._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                disabled={deleteLoading}
                              >
                                {deleteLoading ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPlayers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No players found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
} 