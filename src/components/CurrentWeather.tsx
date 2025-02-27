
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import WeatherIcon from './WeatherIcon';
import { CurrentWeatherData } from '@/types/weather';

interface CurrentWeatherProps {
  weatherData: CurrentWeatherData | null;
  isLoading: boolean;
  className?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  isLoading,
  className
}) => {
  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0 md:ml-auto">
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Weather data unavailable</p>
        </CardContent>
      </Card>
    );
  }

  const {
    weather,
    main,
    wind,
    name,
    sys,
  } = weatherData;

  const currentWeather = weather[0];
  const iconCode = currentWeather.icon;
  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Determine background gradient based on weather condition
  let bgGradientClass = '';
  if (currentWeather.main === 'Clear') {
    bgGradientClass = 'sunny-gradient';
  } else if (currentWeather.main === 'Clouds') {
    bgGradientClass = 'cloudy-gradient';
  } else if (['Rain', 'Drizzle'].includes(currentWeather.main)) {
    bgGradientClass = 'rainy-gradient';
  } else if (currentWeather.main === 'Thunderstorm') {
    bgGradientClass = 'thunder-gradient';
  } else if (currentWeather.main === 'Snow') {
    bgGradientClass = 'snowy-gradient';
  } else {
    bgGradientClass = 'weather-gradient';
  }

  const weatherMetrics = [
    {
      label: 'Humidity',
      value: `${main.humidity}%`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
          <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
        </svg>
      )
    },
    {
      label: 'Wind',
      value: `${Math.round(wind.speed)} mph`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
          <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
        </svg>
      )
    },
    {
      label: 'Sunrise',
      value: sunrise,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2-3 9h6z"></path>
          <path d="M12 14v8"></path>
          <path d="M4 14h16"></path>
          <path d="M4 20h16"></path>
        </svg>
      )
    },
    {
      label: 'Sunset',
      value: sunset,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 10 3-9-3 9z"></path>
          <path d="M12 14v8"></path>
          <path d="M4 14h16"></path>
          <path d="M4 20h16"></path>
        </svg>
      )
    }
  ];

  return (
    <Card className={cn("overflow-hidden animate-fade-up", className)}>
      <div className={cn("h-2", bgGradientClass)} />
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex justify-center md:justify-start">
            <WeatherIcon 
              iconCode={iconCode} 
              description={currentWeather.description}
              size="xl"
            />
          </div>
          
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">{temp}°F</h2>
            <p className="text-sm capitalize">{currentWeather.description}</p>
            <p className="text-xs text-muted-foreground">Feels like {feelsLike}°F</p>
            <p className="text-xs font-medium">{name}, {sys.country}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0 md:ml-auto">
            {weatherMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  {metric.icon}
                  <span>{metric.label}</span>
                </div>
                <span className="text-sm font-medium">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
