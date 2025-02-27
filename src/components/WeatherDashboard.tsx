
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardCard from './DashboardCard';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import LocationSelector from './LocationSelector';
import CropRecommendations from './CropRecommendations';
import MarketPrices from './MarketPrices';
import useWeather from '@/hooks/useWeather';

const WeatherDashboard: React.FC = () => {
  const navigate = useNavigate();
  // Start with a default location (will be overridden by geolocation if available)
  const [location, setLocation] = useState({
    name: 'Loading...',
    lat: 17.550289802066818,
    lon: 78.16638576661204,
  });

  const {
    currentWeather,
    dailyForecasts,
    isLoading,
    error,
    setLocation: updateLocation,
    refetch
  } = useWeather(location);

  const handleLocationChange = (newLocation: typeof location) => {
    setLocation(newLocation);
    updateLocation(newLocation);
  };

  const navigateToSoilAndCrop = () => {
    navigate('/soil-and-crop', { state: { locationName: location.name } });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard 
          gradient
          glassmorphism
          className="col-span-full lg:col-span-2"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Weather Dashboard</h2>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={navigateToSoilAndCrop}
                  disabled={isLoading || !location.name || location.name === 'Loading...'}
                >
                  Soil & Crop Analysis
                </Button>
                <Button variant="outline" size="sm" onClick={refetch} disabled={isLoading}>
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="space-y-6 flex-1">
              <CurrentWeather 
                weatherData={currentWeather} 
                isLoading={isLoading} 
              />
              <WeatherForecast 
                dailyForecasts={dailyForecasts} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        </DashboardCard>
        
        <div className="flex flex-col gap-6">
          <DashboardCard title="Location" glassmorphism>
            <LocationSelector 
              location={location}
              onLocationChange={handleLocationChange}
            />
          </DashboardCard>
          
          <DashboardCard title="Weather Alerts" glassmorphism>
            <div className="min-h-[150px] flex flex-col justify-center items-center text-center">
              <div className="rounded-full bg-amber-500/10 p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                  <path d="M12 12.5a.5.5 0 1 0 .5.5.5.5 0 0 0-.5-.5Z"></path>
                  <path d="M12 18.5a.5.5 0 1 0 .5.5.5.5 0 0 0-.5-.5Z"></path>
                  <path d="M12 9.5a.5.5 0 1 1 .5-.5.5.5 0 0 1-.5.5Z"></path>
                  <path d="M15.22 13.75a2.4 2.4 0 0 1-3.41-3.38"></path>
                  <path d="M13.75 8.78a2.4 2.4 0 0 1 3.41 3.38"></path>
                  <path d="M8.78 10.25a2.4 2.4 0 0 1 3.41 3.38"></path>
                  <path d="M10.25 15.22a2.4 2.4 0 0 1-3.41-3.38"></path>
                  <path d="M14 12.5C11 16 11.1 22 11 22"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">No Active Alerts</h3>
              <p className="text-sm text-muted-foreground">
                There are currently no weather alerts for your location.
              </p>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Sustainability Tips" glassmorphism>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </span>
                <p className="text-xs">Consider mulching to retain soil moisture during dry periods.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </span>
                <p className="text-xs">Based on the forecast, morning irrigation would be most efficient.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </span>
                <p className="text-xs">Consider cover crops to improve soil health for the next growing season.</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      <Tabs defaultValue="crops" className="w-full space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 h-auto p-1">
          <TabsTrigger value="crops" className="py-2">Crop Recommendations</TabsTrigger>
          <TabsTrigger value="market" className="py-2">Market Prices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crops" className="space-y-4 mt-4">
          <CropRecommendations locationName={location.name} />
        </TabsContent>
        
        <TabsContent value="market" className="space-y-4 mt-4">
          <MarketPrices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeatherDashboard;
