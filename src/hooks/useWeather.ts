
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CurrentWeatherData, ForecastData, Location, DailyForecast } from '../types/weather';

const API_KEY = '72cb03ddb9cc38658bd51e4b865978ff';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchCurrentWeather = async (lat: number, lon: number, units = 'metric'): Promise<CurrentWeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch current weather data');
  }
  
  return response.json();
};

const fetchForecast = async (lat: number, lon: number, units = 'metric'): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return response.json();
};

const processDailyForecasts = (forecastData: ForecastData | null): DailyForecast[] => {
  if (!forecastData) return [];
  
  const dailyData: Record<string, DailyForecast> = {};
  
  forecastData.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    
    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        day,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        weather: item.weather[0],
        pop: item.pop
      };
    } else {
      // Update max and min temperatures
      if (item.main.temp_max > dailyData[date].temp_max) {
        dailyData[date].temp_max = item.main.temp_max;
      }
      if (item.main.temp_min < dailyData[date].temp_min) {
        dailyData[date].temp_min = item.main.temp_min;
      }
      
      // Use the weather condition from midday if available
      if (item.dt_txt.includes('12:00:00')) {
        dailyData[date].weather = item.weather[0];
      }
      
      // Update precipitation probability if higher
      if (item.pop > dailyData[date].pop) {
        dailyData[date].pop = item.pop;
      }
    }
  });
  
  return Object.values(dailyData);
};

export const useWeather = (initialLocation: Location) => {
  const [location, setLocation] = useState<Location>(initialLocation);
  
  const {
    data: currentWeather,
    isLoading: isLoadingCurrent,
    error: currentError,
    refetch: refetchCurrent
  } = useQuery({
    queryKey: ['currentWeather', location.lat, location.lon],
    queryFn: () => fetchCurrentWeather(location.lat, location.lon),
    staleTime: 900000, // 15 minutes
    refetchOnWindowFocus: false,
  });
  
  const {
    data: forecast,
    isLoading: isLoadingForecast,
    error: forecastError,
    refetch: refetchForecast
  } = useQuery({
    queryKey: ['forecast', location.lat, location.lon],
    queryFn: () => fetchForecast(location.lat, location.lon),
    staleTime: 900000, // 15 minutes
    refetchOnWindowFocus: false,
  });
  
  const dailyForecasts = processDailyForecasts(forecast || null);
  
  // Handle errors
  useEffect(() => {
    if (currentError) {
      console.error('Error fetching current weather:', currentError);
      toast.error('Failed to fetch current weather data');
    }
    if (forecastError) {
      console.error('Error fetching forecast:', forecastError);
      toast.error('Failed to fetch forecast data');
    }
  }, [currentError, forecastError]);
  
  const refetch = () => {
    refetchCurrent();
    refetchForecast();
    toast.success('Weather data refreshed');
  };
  
  return {
    currentWeather: currentWeather || null,
    forecast: forecast || null,
    dailyForecasts,
    isLoading: isLoadingCurrent || isLoadingForecast,
    error: currentError ? String(currentError) : forecastError ? String(forecastError) : null,
    location,
    setLocation,
    refetch
  };
};

export default useWeather;
