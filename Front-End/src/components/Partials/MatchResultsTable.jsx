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
import { format } from 'date-fns';
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

export default function MatchResultsTable() {
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [leagues, setLeagues] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await NewsService.getMatchs();
      if (response.status === 200) {
        const matchesData = response.data;
        console.log('Matches Data:', matchesData);
        
        setMatches(matchesData);
        setFilteredMatches(matchesData);
        
        // Extract unique leagues
        const uniqueLeagues = matchesData.reduce((acc, match) => {
          if (match.league && !acc.includes(match.league)) {
            acc.push(match.league);
          }
          return acc;
        }, []);
        
        console.log('Unique Leagues:', uniqueLeagues);
        setLeagues(uniqueLeagues);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast.error('Error fetching matches');
    }
  };

  useEffect(() => {
    filterMatches();
  }, [searchQuery, selectedLeague, selectedStatus]);

  const filterMatches = () => {
    let filtered = [...matches];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(match =>
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by league
    if (selectedLeague !== 'all') {
      filtered = filtered.filter(match => match.league === selectedLeague);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(match => match.status === selectedStatus);
    }

    setFilteredMatches(filtered);
  };

  const handleDelete = async (matchId) => {
    setDeleteLoading(true);
    try {
      const response = await MatchService.deleteMatch(matchId);
      if (response.status === 200) {
        toast.success('Match deleted successfully');
        setMatches(prev => prev.filter(match => match._id !== matchId));
        setFilteredMatches(prev => prev.filter(match => match._id !== matchId));
      }
    } catch (error) {
      toast.error('Error deleting match');
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
              placeholder='Search for a Match...' 
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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table Display */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>League</TableHead>
                  <TableHead>Home Team</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Away Team</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.map((match) => (
                  <TableRow key={match._id}>
                    <TableCell>{match.league}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/storage/${match.homeImage}`} 
                        alt={match.homeTeam} 
                        className="w-6 h-6 object-contain"
                      />
                      {match.homeTeam}
                    </TableCell>
                    <TableCell>{match.homeScore} - {match.awayScore}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/storage/${match.awayImage}`} 
                        alt={match.awayTeam} 
                        className="w-6 h-6 object-contain"
                      />
                      {match.awayTeam}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        match.status === 'live' ? 'bg-red-100 text-red-800' :
                        match.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {match.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size='sm' onClick={() => setSelectedMatch(match)}>
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[1000px] max-w-[1000px]">
                            {/* Add MatchDetails component here */}
                            <div className="p-4">
                              <h2 className="text-2xl font-bold mb-4">Match Details</h2>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Home Team Stats</h3>
                                  {JSON.parse(match.homeTeamStats).map((player, index) => (
                                    <div key={index} className="flex items-center gap-2 mb-2">
                                      <img 
                                        src={`${import.meta.env.VITE_API_URL}/storage/${player.image}`} 
                                        alt={player.name} 
                                        className="w-8 h-8 rounded-full"
                                      />
                                      <span>{player.name}</span>
                                    </div>
                                  ))}
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">Away Team Stats</h3>
                                  {JSON.parse(match.awayTeamStats).map((player, index) => (
                                    <div key={index} className="flex items-center gap-2 mb-2">
                                      <img 
                                        src={`${import.meta.env.VITE_API_URL}/storage/${player.image}`} 
                                        alt={player.name} 
                                        className="w-8 h-8 rounded-full"
                                      />
                                      <span>{player.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {match.replayLink && (
                                <div className="mt-4">
                                  <h3 className="font-semibold mb-2">Replay Link</h3>
                                  <a 
                                    href={match.replayLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    Watch Replay
                                  </a>
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
                              <AlertDialogTitle>Are you sure you want to delete this match?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the match
                                and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(match._id)}
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
                {filteredMatches.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No matches found
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