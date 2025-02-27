
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import WeatherIcon from './WeatherIcon';
import { DailyForecast } from '@/types/weather';

interface WeatherForecastProps {
  dailyForecasts: DailyForecast[];
  isLoading: boolean;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  dailyForecasts,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Limit to 5 days and exclude today if we have enough data
  const forecast = dailyForecasts.length > 5 ? dailyForecasts.slice(1, 6) : dailyForecasts.slice(0, 5);

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-3 rounded-lg transition-all hover:bg-muted/50"
            >
              <span className="font-medium text-sm mb-2">{day.day}</span>
              <WeatherIcon 
                iconCode={day.weather.icon} 
                description={day.weather.description}
                size="md"
                className="mb-2"
              />
              <div className="text-sm font-medium">
                {Math.round(day.temp_max)}° <span className="text-muted-foreground">{Math.round(day.temp_min)}°</span>
              </div>
              {day.pop > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a8 8 0 0 1-8-8c0-3.502 2.71-6.303 5.093-8.93C10.2 3.34 11.093 2.277 12 1c0 0 11 8.061 11 13a8 8 0 0 1-8 8Z"></path>
                  </svg>
                  <span>{Math.round(day.pop * 100)}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
