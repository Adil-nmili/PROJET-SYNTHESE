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

export default function TeamsTable() {
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [leagues, setLeagues] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await NewsService.getTeamInfo();
      if (response.status === 200) {
        const teamsData = response.data;
        console.log('Teams Data:', teamsData);
        
        setTeams(teamsData);
        setFilteredTeams(teamsData);
        
        // Extract unique leagues
        const uniqueLeagues = teamsData.reduce((acc, team) => {
          if (team.league && !acc.includes(team.league)) {
            acc.push(team.league);
          }
          return acc;
        }, []);
        
        console.log('Unique Leagues:', uniqueLeagues);
        setLeagues(uniqueLeagues);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Error fetching teams');
    }
  };

  useEffect(() => {
    filterTeams();
  }, [searchQuery, selectedLeague]);

  const filterTeams = () => {
    let filtered = [...teams];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.league.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by league
    if (selectedLeague !== 'all') {
      filtered = filtered.filter(team => team.league === selectedLeague);
    }

    setFilteredTeams(filtered);
  };

  const handleDelete = async (teamId) => {
    setDeleteLoading(true);
    try {
      const response = await NewsService.deleteTeam(teamId);
      if (response.status === 200) {
        toast.success('Team deleted successfully');
        setTeams(prev => prev.filter(team => team._id !== teamId));
        setFilteredTeams(prev => prev.filter(team => team._id !== teamId));
      }
    } catch (error) {
      toast.error('Error deleting team');
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
              placeholder='Search for a Team...' 
              className='placeholder:text-s pr-13'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className='absolute top-0 right-0' variant={'outline'}>
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex gap-4">
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by League" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leagues</SelectItem>
                {leagues.map((league) => (
                  <SelectItem key={league} value={league}>
                    {league}
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
                  <TableHead>Logo</TableHead>
                  <TableHead>Team Name</TableHead>
                  <TableHead>League</TableHead>
                  <TableHead>Founded</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team._id}>
                    <TableCell>
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/storage/${team.logo}`} 
                        alt={team.name} 
                        className="w-10 h-10 object-contain"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.league}</TableCell>
                    <TableCell>{team.founded}</TableCell>
                    <TableCell>{team.venue}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size='sm' onClick={() => setSelectedTeam(team)}>
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[1000px] max-w-[1000px]">
                            <div className="p-4">
                              <h2 className="text-2xl font-bold mb-4">Team Details</h2>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Team Information</h3>
                                  <div className="space-y-2">
                                    <p><span className="font-medium">Name:</span> {team.name}</p>
                                    <p><span className="font-medium">League:</span> {team.league}</p>
                                    <p><span className="font-medium">Founded:</span> {team.founded}</p>
                                    <p><span className="font-medium">Venue:</span> {team.venue}</p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">Team Logo</h3>
                                  <img 
                                    src={`${import.meta.env.VITE_API_URL}/storage/${team.logo}`} 
                                    alt={team.name} 
                                    className="w-32 h-32 object-contain"
                                  />
                                </div>
                              </div>
                              {team.description && (
                                <div className="mt-4">
                                  <h3 className="font-semibold mb-2">Description</h3>
                                  <p className="text-gray-600">{team.description}</p>
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
                              <AlertDialogTitle>Are you sure you want to delete this team?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the team
                                and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(team._id)}
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
                {filteredTeams.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No teams found
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