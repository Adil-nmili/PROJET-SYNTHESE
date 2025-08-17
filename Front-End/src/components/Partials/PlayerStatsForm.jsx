import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { NewsService } from "../../../service/newsService";
import toast from "react-hot-toast";
// import { toast } from "../ui/use-toast";

export default function PlayerStatsForm() {
  const [player, setPlayer] = useState({
    name: '',
    image: null,
    points: '',
    rebounds: '',
    assists: '',
    team: '',
    position: '',
    description: ''
  });

  const positions = [
    "Point Guard",
    "Shooting Guard",
    "Small Forward",
    "Power Forward",
    "Center"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlayer({ ...player, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Append all fields
      formData.append('name', player.name);
      formData.append('points', player.points);
      formData.append('rebounds', player.rebounds);
      formData.append('assists', player.assists);
      formData.append('team', player.team);
      formData.append('position', player.position);
      formData.append('description', player.description);
      
      // Append image file
      if (player.image) {
        formData.append('image', player.image);
      }

      const response = await NewsService.createPlayerStats(formData);
      if (response.status === 201) {
        // Reset form
        setPlayer({
          name: '',
          image: null,
          points: '',
          rebounds: '',
          assists: '',
          team: '',
          position: '',
          description: ''
        });
        toast({
          title: "Success!",
          description: "Player stats have been added successfully.",
        });
      }
    } catch (error) {
      console.error('Error submitting player stats:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add player stats. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add Player Statistics</CardTitle>
        <CardDescription>
          Enter the player's information and statistics below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Player Name</Label>
              <Input 
                id="name"
                type="text" 
                value={player.name}
                onChange={(e) => setPlayer({...player, name: e.target.value})}
                placeholder="Enter player name..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Input 
                id="team"
                type="text" 
                value={player.team}
                onChange={(e) => setPlayer({...player, team: e.target.value})}
                placeholder="Enter team name..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select 
                value={player.position} 
                onValueChange={(value) => setPlayer({...player, position: value})}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Player Image</Label>
              <Input 
                id="image"
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                required
                className="cursor-pointer"
              />
              {player.image && (
                <div className="mt-2 p-2 border rounded-lg">
                  <img 
                    src={URL.createObjectURL(player.image)} 
                    alt="Player preview" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={player.description}
              onChange={(e) => setPlayer({...player, description: e.target.value})}
              placeholder="Enter player description..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input 
                id="points"
                type="number" 
                value={player.points}
                onChange={(e) => setPlayer({...player, points: e.target.value})}
                placeholder="Enter points..."
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rebounds">Rebounds</Label>
              <Input 
                id="rebounds"
                type="number" 
                value={player.rebounds}
                onChange={(e) => setPlayer({...player, rebounds: e.target.value})}
                placeholder="Enter rebounds..."
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assists">Assists</Label>
              <Input 
                id="assists"
                type="number" 
                value={player.assists}
                onChange={(e) => setPlayer({...player, assists: e.target.value})}
                placeholder="Enter assists..."
                required
                min="0"
              />
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto md:self-end">
            Add Player Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}