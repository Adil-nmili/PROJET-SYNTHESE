import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { NewsService } from "../../../service/newsService";

export default function ResultMatchsForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    league: '',
    status: '',
    homeTeam: '',
    homeLogo: null,
    homeScore: '',
    awayTeam: '',
    awayLogo: null,
    awayScore: '',
    replayLink: '',
    homeTeamStats: [],
    awayTeamStats: []
  });

  const [currentPlayer, setCurrentPlayer] = useState({
    name: '',
    image: null,
    points: '',
    rebounds: '',
    assists: '',
    steals: '',
    blocks: ''
  });

  const handleImageChange = (e, team) => {
    const file = e.target.files[0];
    if (file) {
      if (team === 'home') {
        setData({ ...data, homeLogo: file });
      } else {
        setData({ ...data, awayLogo: file });
      }
    }
  };

  const handlePlayerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentPlayer({ ...currentPlayer, image: file });
    }
  };

  const addPlayerStats = (e, team) => {
    e.preventDefault();
    if (team === 'home') {
      setData({
        ...data,
        homeTeamStats: [...data.homeTeamStats, currentPlayer]
      });
    } else {
      setData({
        ...data,
        awayTeamStats: [...data.awayTeamStats, currentPlayer]
      });
    }
    setCurrentPlayer({
      name: '',
      image: null,
      points: '',
      rebounds: '',
      assists: '',
      steals: '',
      blocks: ''
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Append all text fields
      formData.append('league', data.league);
      formData.append('status', data.status);
      formData.append('homeTeam', data.homeTeam);
      formData.append('awayTeam', data.awayTeam);
      formData.append('homeScore', data.homeScore);
      formData.append('awayScore', data.awayScore);
      formData.append('replayLink', data.replayLink);
      
      // Append image files
      if (data.homeLogo) {
        formData.append('homeLogo', data.homeLogo);
      }
      if (data.awayLogo) {
        formData.append('awayLogo', data.awayLogo);
      }
      
      // Process player stats and images
      const processedHomeStats = data.homeTeamStats.map(player => ({
        ...player,
        image: player.image instanceof File ? URL.createObjectURL(player.image) : player.image
      }));
      
      const processedAwayStats = data.awayTeamStats.map(player => ({
        ...player,
        image: player.image instanceof File ? URL.createObjectURL(player.image) : player.image
      }));
      
      // Append JSON data
      formData.append('homeTeamStats', JSON.stringify(processedHomeStats));
      formData.append('awayTeamStats', JSON.stringify(processedAwayStats));

      const response = await NewsService.createMatch(formData);
      if (response.status === 201) {
        // Reset form
        setData({
          league: '',
          status: '',
          homeTeam: '',
          homeLogo: null,
          homeScore: '',
          awayTeam: '',
          awayLogo: null,
          awayScore: '',
          replayLink: '',
          homeTeamStats: [],
          awayTeamStats: []
        });
        setStep(1);
        alert('Match result added successfully!');
      }
    } catch (error) {
      console.error('Error submitting match result:', error);
      alert('Failed to add match result. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Step 1: Basic Match Information</h3>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <Label>League:</Label>
                <Input 
                  type="text" 
                  name="league" 
                  placeholder="League Name..." 
                  value={data.league}
                  onChange={(e) => setData({...data, league: e.target.value})}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <Label>Status:</Label>
                <Input 
                  type="text" 
                  name="status" 
                  placeholder="Match status..." 
                  value={data.status}
                  onChange={(e) => setData({...data, status: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <Label>Home Team:</Label>
                <Input 
                  type="text" 
                  name="homeTeam" 
                  placeholder="Home team name..." 
                  value={data.homeTeam}
                  onChange={(e) => setData({...data, homeTeam: e.target.value})}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <Label>Home Score:</Label>
                <Input 
                  type="text" 
                  name="homeScore" 
                  placeholder="Home score..." 
                  value={data.homeScore}
                  onChange={(e) => setData({...data, homeScore: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <Label>Away Team:</Label>
                <Input 
                  type="text" 
                  name="awayTeam" 
                  placeholder="Away Team..." 
                  value={data.awayTeam}
                  onChange={(e) => setData({...data, awayTeam: e.target.value})}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <Label>Away Score:</Label>
                <Input 
                  type="text" 
                  name="awayScore" 
                  placeholder="Away score..." 
                  value={data.awayScore}
                  onChange={(e) => setData({...data, awayScore: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Step 2: Team Logos</h3>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <Label>Home Team Logo:</Label>
                <Input 
                  type="file" 
                  name="homeLogo" 
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'home')}
                />
                {data.homeLogo && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(data.homeLogo)} 
                      alt="Home team logo preview" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <Label>Away Team Logo:</Label>
                <Input 
                  type="file" 
                  name="awayLogo" 
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'away')}
                />
                {data.awayLogo && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(data.awayLogo)} 
                      alt="Away team logo preview" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <Label>Replay Link:</Label>
                <Input 
                  type="text" 
                  name="replayLink" 
                  placeholder="Replay Link video..." 
                  value={data.replayLink}
                  onChange={(e) => setData({...data, replayLink: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Step 3: Home Team Player Stats</h3>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label>Player Name:</Label>
                  <Input 
                    type="text" 
                    value={currentPlayer.name}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, name: e.target.value})}
                    placeholder="Player name..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Player Image:</Label>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handlePlayerImageChange}
                  />
                  {currentPlayer.image && (
                    <div className="mt-2">
                      <img 
                        src={URL.createObjectURL(currentPlayer.image)} 
                        alt="Player preview" 
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="flex flex-col gap-1">
                  <Label>Points:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.points}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, points: e.target.value})}
                    placeholder="Points..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Rebounds:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.rebounds}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, rebounds: e.target.value})}
                    placeholder="Rebounds..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Assists:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.assists}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, assists: e.target.value})}
                    placeholder="Assists..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Steals:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.steals}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, steals: e.target.value})}
                    placeholder="Steals..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Blocks:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.blocks}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, blocks: e.target.value})}
                    placeholder="Blocks..."
                  />
                </div>
              </div>
              <Button 
                type="button" 
                onClick={(e) => addPlayerStats(e, 'home')}
                className="mt-2"
              >
                Add Player
              </Button>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Added Players:</h4>
              <div className="space-y-2">
                {data.homeTeamStats.map((player, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    {player.name} - PTS: {player.points} | REB: {player.rebounds} | AST: {player.assists}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Step 4: Away Team Player Stats</h3>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label>Player Name:</Label>
                  <Input 
                    type="text" 
                    value={currentPlayer.name}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, name: e.target.value})}
                    placeholder="Player name..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Player Image:</Label>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handlePlayerImageChange}
                  />
                  {currentPlayer.image && (
                    <div className="mt-2">
                      <img 
                        src={URL.createObjectURL(currentPlayer.image)} 
                        alt="Player preview" 
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="flex flex-col gap-1">
                  <Label>Points:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.points}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, points: e.target.value})}
                    placeholder="Points..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Rebounds:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.rebounds}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, rebounds: e.target.value})}
                    placeholder="Rebounds..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Assists:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.assists}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, assists: e.target.value})}
                    placeholder="Assists..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Steals:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.steals}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, steals: e.target.value})}
                    placeholder="Steals..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Blocks:</Label>
                  <Input 
                    type="number" 
                    value={currentPlayer.blocks}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, blocks: e.target.value})}
                    placeholder="Blocks..."
                  />
                </div>
              </div>
              <Button 
                type="button" 
                onClick={(e) => addPlayerStats(e, 'away')}
                className="mt-2"
              >
                Add Player
              </Button>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Added Players:</h4>
              <div className="space-y-2">
                {data.awayTeamStats.map((player, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    {player.name} - PTS: {player.points} | REB: {player.rebounds} | AST: {player.assists}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insert a new match</CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {renderStep()}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <Button type="button" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
