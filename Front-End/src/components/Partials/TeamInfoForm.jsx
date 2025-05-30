import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { useToast } from '../ui/use-toast';
import { NewsService } from '../../../service/newsService';

export function TeamInfoForm() {
//   const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    league: '',
    city: '',
    stadium: '',
    founded_year: '',
    head_coach: '',
    description: '',
    website: '',
    social_media: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.league || !formData.city || !formData.stadium || !formData.founded_year) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const submitData = new FormData();
      
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Append logo if selected
      const logoInput = document.querySelector('input[type="file"]');
      if (logoInput?.files[0]) {
        submitData.append('logo', logoInput.files[0]);
      }

      await NewsService.createTeamInfo(submitData);
      
      toast({
        title: 'Success',
        description: 'Team information created successfully',
      });

      // Reset form
      setFormData({
        name: '',
        league: '',
        city: '',
        stadium: '',
        founded_year: '',
        head_coach: '',
        description: '',
        website: '',
        social_media: ''
      });
      setLogoPreview(null);
      if (logoInput) {
        logoInput.value = '';
      }

    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create team information',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add Team Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Team Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter team name"
                required
              />
            </div>

            {/* League */}
            <div className="space-y-2">
              <Label htmlFor="league">League *</Label>
              <Input
                id="league"
                name="league"
                value={formData.league}
                onChange={handleInputChange}
                placeholder="Enter league name"
                required
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                required
              />
            </div>

            {/* Stadium */}
            <div className="space-y-2">
              <Label htmlFor="stadium">Stadium *</Label>
              <Input
                id="stadium"
                name="stadium"
                value={formData.stadium}
                onChange={handleInputChange}
                placeholder="Enter stadium name"
                required
              />
            </div>

            {/* Founded Year */}
            <div className="space-y-2">
              <Label htmlFor="founded_year">Founded Year *</Label>
              <Input
                id="founded_year"
                name="founded_year"
                type="number"
                value={formData.founded_year}
                onChange={handleInputChange}
                placeholder="Enter founded year"
                min="1800"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>

            {/* Head Coach */}
            <div className="space-y-2">
              <Label htmlFor="head_coach">Head Coach</Label>
              <Input
                id="head_coach"
                name="head_coach"
                value={formData.head_coach}
                onChange={handleInputChange}
                placeholder="Enter head coach name"
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter team website"
              />
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <Label htmlFor="social_media">Social Media</Label>
              <Input
                id="social_media"
                name="social_media"
                value={formData.social_media}
                onChange={handleInputChange}
                placeholder="Enter social media handles"
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="logo">Team Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="cursor-pointer"
              />
              {logoPreview && (
                <div className="mt-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-32 h-32 object-contain border rounded"
                  />
                </div>
              )}
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
              placeholder="Enter team description"
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating...' : 'Create Team Information'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}