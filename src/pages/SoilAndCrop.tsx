
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { getSoilTypesForLocation, getCropRecommendations } from '@/utils/gemini';
import type { GeminiSoilInfo, GeminiCropRecommendation } from '@/utils/gemini';

interface CropRecommendation {
  name: string;
  suitability: 'High' | 'Medium' | 'Low';
  growthPeriod: string;
  waterRequirements: string;
  idealTemperature: string;
  notes: string;
}

// Fallback soil types when API call fails or for initial loading
const fallbackSoilTypes: Record<string, GeminiSoilInfo> = {
  'sandy': {
    soilType: 'Sandy Soil',
    description: 'Light, warm soil that drains quickly and is easy to work with, but may not retain nutrients well.',
    characteristics: ['Warms quickly in spring', 'Drains well', 'Low in nutrients', 'Requires frequent watering'],
    suitableCrops: ['Carrots', 'Potatoes', 'Radishes', 'Lettuces', 'Strawberries']
  },
  'loamy': {
    soilType: 'Loamy Soil',
    description: 'Ideal garden soil with a good balance of sand, silt and clay that retains moisture and nutrients.',
    characteristics: ['Good drainage', 'Retains moisture', 'Rich in nutrients', 'Easy to work with'],
    suitableCrops: ['Most vegetables', 'Wheat', 'Rice', 'Maize', 'Pulses']
  },
  'clay': {
    soilType: 'Clay Soil',
    description: 'Heavy, nutrient-rich soil that holds water well but can be difficult to work with and slow to warm up.',
    characteristics: ['Retains water', 'Rich in nutrients', 'Compacts easily', 'Slow to warm up'],
    suitableCrops: ['Cabbage', 'Broccoli', 'Brussels Sprouts', 'Rice', 'Wheat']
  },
  'silty': {
    soilType: 'Silty Soil',
    description: 'Fertile, moisture-retentive soil that is easy to work with but may compact easily.',
    characteristics: ['Retains moisture', 'Rich in nutrients', 'Compacts easily', 'Feels smooth and silky'],
    suitableCrops: ['Most vegetables', 'Wetland rice', 'Water-loving grasses', 'Fruit trees']
  },
  'peaty': {
    soilType: 'Peaty Soil',
    description: 'Dark, acidic soil with high organic content, good for acid-loving plants but may require drainage.',
    characteristics: ['Acidic', 'High in organic matter', 'Retains moisture', 'Slow to warm up'],
    suitableCrops: ['Potatoes', 'Root vegetables', 'Blueberries', 'Legumes']
  },
  'chalky': {
    soilType: 'Chalky Soil',
    description: 'Alkaline soil that drains freely and warms up quickly, but may lack some nutrients.',
    characteristics: ['Alkaline', 'Drains well', 'May lack nutrients', 'Contains lime'],
    suitableCrops: ['Spinach', 'Beets', 'Sweet Corn', 'Cabbage']
  }
};

const SoilAndCrop: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationName, setLocationName] = useState<string>('');
  const [selectedSoil, setSelectedSoil] = useState<string>('');
  const [farmingStatus, setFarmingStatus] = useState<string>('new');
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Add states for API data and loading
  const [soilTypes, setSoilTypes] = useState<Record<string, GeminiSoilInfo>>(fallbackSoilTypes);
  const [loadingSoils, setLoadingSoils] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // Get location from state passed during navigation
  useEffect(() => {
    if (location.state?.locationName) {
      setLocationName(location.state.locationName);
      fetchSoilTypes(location.state.locationName);
    } else {
      // If no location provided, redirect back to dashboard
      toast.error('No location data. Please select a location first.');
      navigate('/');
    }
  }, [location, navigate]);

  // Fetch soil types from Gemini API
  const fetchSoilTypes = async (locName: string) => {
    setLoadingSoils(true);
    try {
      const soilData = await getSoilTypesForLocation(locName);
      if (soilData && Object.keys(soilData).length > 0) {
        setSoilTypes(soilData);
        toast.success('Soil data retrieved for your location');
      } else {
        // If API returns no data, use fallback
        setSoilTypes(fallbackSoilTypes);
        toast.info('Using default soil data for your location');
      }
    } catch (error) {
      console.error('Error fetching soil types:', error);
      setSoilTypes(fallbackSoilTypes);
      toast.error('Failed to retrieve soil data. Using defaults instead.');
    } finally {
      setLoadingSoils(false);
    }
  };

  // Show recommendations based on soil and farming status
  const handleViewRecommendations = async () => {
    if (!selectedSoil) {
      toast.error('Please select a soil type first');
      return;
    }

    setLoadingRecommendations(true);
    setShowRecommendations(false);
    
    try {
      // Get the selected soil info
      const selectedSoilInfo = soilTypes[selectedSoil];
      
      // Get dynamic recommendations from Gemini API
      const apiRecommendations = await getCropRecommendations(
        locationName,
        selectedSoilInfo.soilType,
        farmingStatus === 'new'
      );
      
      if (apiRecommendations && apiRecommendations.length > 0) {
        setRecommendations(apiRecommendations);
        setShowRecommendations(true);
        toast.success('Crop recommendations generated for your farm');
      } else {
        // If no data from API, show error
        setRecommendations([]);
        toast.error('No specific recommendations available for this combination');
      }
    } catch (error) {
      console.error('Error fetching crop recommendations:', error);
      setRecommendations([]);
      toast.error('Failed to generate recommendations');
    } finally {
      setLoadingRecommendations(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Soil & Crop Analysis</h1>
            <p className="text-muted-foreground">
              {locationName ? `For ${locationName}` : 'Select a location to continue'}
            </p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Soil Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Select Your Soil Type
                {loadingSoils && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </CardTitle>
              <CardDescription>
                Choose the soil type that best matches your farm land
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                value={selectedSoil} 
                onValueChange={setSelectedSoil}
                disabled={loadingSoils}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingSoils ? "Loading soil types..." : "Select soil type"} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(soilTypes).map(([key, soil]) => (
                    <SelectItem key={key} value={key}>{soil.soilType}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSoil && (
                <div className="mt-4 space-y-3 p-4 bg-muted/40 rounded-lg">
                  <h3 className="font-medium">{soilTypes[selectedSoil].soilType}</h3>
                  <p className="text-sm">{soilTypes[selectedSoil].description}</p>
                  
                  <h4 className="font-medium text-sm mt-3">Characteristics:</h4>
                  <ul className="text-sm space-y-1">
                    {soilTypes[selectedSoil].characteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> {char}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium text-sm mt-3">Suitable Crops:</h4>
                  <div className="flex flex-wrap gap-2">
                    {soilTypes[selectedSoil].suitableCrops.map((crop, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Farming Status */}
          <Card>
            <CardHeader>
              <CardTitle>Farming Status</CardTitle>
              <CardDescription>
                Tell us about your current farming activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={farmingStatus} 
                onValueChange={setFarmingStatus}
                className="space-y-4"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="font-normal cursor-pointer">
                    <div className="font-medium">Yet to start farming</div>
                    <p className="text-sm text-muted-foreground">I&apos;m planning to start farming soon and need recommendations</p>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing" className="font-normal cursor-pointer">
                    <div className="font-medium">Already farming</div>
                    <p className="text-sm text-muted-foreground">I have crops in the ground and need maintenance advice</p>
                  </Label>
                </div>
              </RadioGroup>

              <Button 
                onClick={handleViewRecommendations} 
                className="mt-6 w-full"
                disabled={!selectedSoil || loadingRecommendations}
              >
                {loadingRecommendations ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Recommendations...
                  </>
                ) : (
                  'View Recommendations'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Crop Recommendations */}
        {showRecommendations && (
          <Card className="animate-fade-up">
            <CardHeader>
              <CardTitle>
                Crop Recommendations
                <span className="text-sm font-normal ml-2 text-muted-foreground">
                  Based on your {soilTypes[selectedSoil].soilType} and {farmingStatus === 'new' ? 'new farming' : 'existing crops'}
                </span>
              </CardTitle>
              <CardDescription>
                Best crops and practices for the next 2-3 months considering your soil type and local weather
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendations.map((crop, index) => (
                  <div key={index} className="space-y-3">
                    {index > 0 && <Separator />}
                    <div className="pt-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{crop.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          crop.suitability === 'High' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : crop.suitability === 'Medium'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {crop.suitability} Suitability
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Growth Period</p>
                          <p className="text-sm font-medium">{crop.growthPeriod}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Water Requirements</p>
                          <p className="text-sm font-medium">{crop.waterRequirements}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Ideal Temperature</p>
                          <p className="text-sm font-medium">{crop.idealTemperature}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-muted/40 rounded-lg text-sm">
                        <p>{crop.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SoilAndCrop;
