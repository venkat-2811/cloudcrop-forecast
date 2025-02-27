
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

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  onLocationChange
}) => {
  const [isLocating, setIsLocating] = useState(false);
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

  // In a real app we'd use an API to search for locations by name
  // This is just a placeholder showing UI without implementation
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Location search is not implemented in this demo');
    setSearchQuery('');
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="secondary">
          Search
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
