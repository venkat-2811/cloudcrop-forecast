
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface LocationSelectorProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

// Interface for OpenWeatherMap geocoding API response
interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  onLocationChange
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGetCurrentLocation = async () => {
    setIsLocating(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange({
            name: 'Current Location',
            lat: latitude,
            lon: longitude
          });
          toast.success('Location updated successfully');
          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast.error('Failed to get your location. Please check your browser permissions.');
          setIsLocating(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } catch (error) {
      console.error('Error getting location:', error);
      toast.error('Failed to get your location');
      setIsLocating(false);
    }
  };

  // On initial mount, try to get the user's location if we don't have one
  useEffect(() => {
    if (!location.lat && !location.lon) {
      handleGetCurrentLocation();
    }
  }, []);

  // Function to search for locations using OpenWeatherMap geocoding API
  const searchLocation = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      const API_KEY = '72cb03ddb9cc38658bd51e4b865978ff';
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search for location');
      }
      
      const data: GeocodingResult[] = await response.json();
      
      if (data.length === 0) {
        toast.error('Location not found. Try a different search term.');
        setIsSearching(false);
        return;
      }
      
      const result = data[0];
      const locationName = result.state 
        ? `${result.name}, ${result.state}, ${result.country}`
        : `${result.name}, ${result.country}`;
        
      onLocationChange({
        name: locationName,
        lat: result.lat,
        lon: result.lon
      });
      
      toast.success(`Location updated to ${locationName}`);
      setSearchQuery('');
    } catch (error) {
      console.error('Error searching for location:', error);
      toast.error('Failed to search for location');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          disabled={isSearching}
        />
        <Button 
          type="submit" 
          variant="secondary"
          disabled={isSearching || !searchQuery.trim()}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </form>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="text-xs"
        >
          {isLocating ? 'Getting location...' : 'Use Current Location'}
        </Button>
        
        <div className="text-xs font-medium">
          {location.name && (
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {location.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
