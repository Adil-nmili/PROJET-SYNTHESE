import React, { useState } from 'react';
// import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { NewsService } from "../../../service/newsService";

const MatchCalendarForm = () => {
//   const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    league: '',
    home_team: '',
    away_team: '',
    home_logo: null,
    away_logo: null,
    match_date: new Date(),
    venue: '',
    status: 'scheduled',
    description: ''
  });

  const [homeLogoPreview, setHomeLogoPreview] = useState(null);
  const [awayLogoPreview, setAwayLogoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e, team) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [`${team}_logo`]: file
      }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      if (team === 'home') {
        setHomeLogoPreview(previewUrl);
      } else {
        setAwayLogoPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'match_date') {
          formDataToSend.append(key, formData[key].toISOString());
        } else if (key === 'home_logo' || key === 'away_logo') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await NewsService.createMatchCalendar(formDataToSend);

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Match calendar created successfully",
        });

        // Reset form
        setFormData({
          league: '',
          home_team: '',
          away_team: '',
          home_logo: null,
          away_logo: null,
          match_date: new Date(),
          venue: '',
          status: 'scheduled',
          description: ''
        });
        setHomeLogoPreview(null);
        setAwayLogoPreview(null);
      }
    } catch (error) {
      console.error('Error creating match calendar:', error);
      toast({
        title: "Error",
        description: "Failed to create match calendar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* League */}
        <div className="space-y-2">
          <Label htmlFor="league">League</Label>
          <Input
            id="league"
            name="league"
            value={formData.league}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="postponed">Postponed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Home Team */}
        <div className="space-y-2">
          <Label htmlFor="home_team">Home Team</Label>
          <Input
            id="home_team"
            name="home_team"
            value={formData.home_team}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Away Team */}
        <div className="space-y-2">
          <Label htmlFor="away_team">Away Team</Label>
          <Input
            id="away_team"
            name="away_team"
            value={formData.away_team}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Home Team Logo */}
        <div className="space-y-2">
          <Label htmlFor="home_logo">Home Team Logo</Label>
          <Input
            id="home_logo"
            type="file"
            accept="image/*"
            onChange={(e) => handleLogoChange(e, 'home')}
          />
          {homeLogoPreview && (
            <img
              src={homeLogoPreview}
              alt="Home team logo preview"
              className="w-20 h-20 object-contain mt-2"
            />
          )}
        </div>

        {/* Away Team Logo */}
        <div className="space-y-2">
          <Label htmlFor="away_logo">Away Team Logo</Label>
          <Input
            id="away_logo"
            type="file"
            accept="image/*"
            onChange={(e) => handleLogoChange(e, 'away')}
          />
          {awayLogoPreview && (
            <img
              src={awayLogoPreview}
              alt="Away team logo preview"
              className="w-20 h-20 object-contain mt-2"
            />
          )}
        </div>

        {/* Match Date */}
        <div className="space-y-2">
          <Label>Match Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.match_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.match_date ? (
                  format(formData.match_date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.match_date}
                onSelect={(date) => setFormData(prev => ({ ...prev, match_date: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Venue */}
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Match Calendar"}
      </Button>
    </form>
  );
};

export default MatchCalendarForm;