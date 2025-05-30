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

export default function MatchCalendarTable() {
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [leagues, setLeagues] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await NewsService.getMatchCalendars();
      if (response.status === 200) {
        const matchesData = response.data;
        console.log('Calendar Matches Data:', matchesData);
        
        // Filter only upcoming matches
        const upcomingMatches = matchesData.filter(match => match.status === 'upcoming');
        setMatches(upcomingMatches);
        setFilteredMatches(upcomingMatches);
        
        // Extract unique leagues
        const uniqueLeagues = upcomingMatches.reduce((acc, match) => {
          if (match.league && !acc.includes(match.league)) {
            acc.push(match.league);
          }
          return acc;
        }, []);
        
        console.log('Unique Leagues:', uniqueLeagues);
        setLeagues(uniqueLeagues);
      }
    } catch (error) {
      console.error('Error fetching calendar matches:', error);
      toast.error('Error fetching calendar matches');
    }
  };

  useEffect(() => {
    filterMatches();
  }, [searchQuery, selectedLeague, selectedDate]);

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

    // Filter by date
    if (selectedDate !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      filtered = filtered.filter(match => {
        const matchDate = new Date(match.date);
        switch (selectedDate) {
          case 'today':
            return matchDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return matchDate.toDateString() === tomorrow.toDateString();
          case 'week':
            return matchDate >= today && matchDate <= nextWeek;
          default:
            return true;
        }
      });
    }

    setFilteredMatches(filtered);
  };

  const handleDelete = async (matchId) => {
    setDeleteLoading(true);
    try {
      const response = await NewsService.deleteMatch(matchId);
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

            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">Next 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table Display */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>League</TableHead>
                  <TableHead>Home Team</TableHead>
                  <TableHead>VS</TableHead>
                  <TableHead>Away Team</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.map((match) => (
                  <TableRow key={match._id}>
                    <TableCell>
                      {format(new Date(match.date), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{match.league}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/storage/${match.homeImage}`} 
                        alt={match.homeTeam} 
                        className="w-6 h-6 object-contain"
                      />
                      {match.homeTeam}
                    </TableCell>
                    <TableCell className="text-center font-bold">VS</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/storage/${match.awayImage}`} 
                        alt={match.awayTeam} 
                        className="w-6 h-6 object-contain"
                      />
                      {match.awayTeam}
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
                            <div className="p-4">
                              <h2 className="text-2xl font-bold mb-4">Match Details</h2>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Home Team</h3>
                                  <div className="flex items-center gap-2 mb-2">
                                    <img 
                                      src={`${import.meta.env.VITE_API_URL}/storage/${match.homeImage}`} 
                                      alt={match.homeTeam} 
                                      className="w-12 h-12 object-contain"
                                    />
                                    <span className="text-lg font-semibold">{match.homeTeam}</span>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">Away Team</h3>
                                  <div className="flex items-center gap-2 mb-2">
                                    <img 
                                      src={`${import.meta.env.VITE_API_URL}/storage/${match.awayImage}`} 
                                      alt={match.awayTeam} 
                                      className="w-12 h-12 object-contain"
                                    />
                                    <span className="text-lg font-semibold">{match.awayTeam}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h3 className="font-semibold mb-2">Match Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p><span className="font-medium">League:</span> {match.league}</p>
                                    <p><span className="font-medium">Date:</span> {format(new Date(match.date), 'MMMM dd, yyyy')}</p>
                                    <p><span className="font-medium">Time:</span> {format(new Date(match.date), 'HH:mm')}</p>
                                  </div>
                                  <div>
                                    <p><span className="font-medium">Status:</span> {match.status}</p>
                                    {match.venue && <p><span className="font-medium">Venue:</span> {match.venue}</p>}
                                  </div>
                                </div>
                              </div>
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
                      No upcoming matches found
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