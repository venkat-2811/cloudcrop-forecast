
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

interface SoilInfo {
  type: string;
  description: string;
  crops: string[];
  characteristics: string[];
}

interface CropRecommendation {
  name: string;
  suitability: 'High' | 'Medium' | 'Low';
  growthPeriod: string;
  waterRequirements: string;
  idealTemperature: string;
  notes: string;
}

const soilTypes: Record<string, SoilInfo> = {
  'sandy': {
    type: 'Sandy Soil',
    description: 'Light, warm soil that drains quickly and is easy to work with, but may not retain nutrients well.',
    crops: ['Carrots', 'Potatoes', 'Radishes', 'Lettuces', 'Strawberries'],
    characteristics: ['Warms quickly in spring', 'Drains well', 'Low in nutrients', 'Requires frequent watering']
  },
  'loamy': {
    type: 'Loamy Soil',
    description: 'Ideal garden soil with a good balance of sand, silt and clay that retains moisture and nutrients.',
    crops: ['Most vegetables', 'Wheat', 'Rice', 'Maize', 'Pulses'],
    characteristics: ['Good drainage', 'Retains moisture', 'Rich in nutrients', 'Easy to work with']
  },
  'clay': {
    type: 'Clay Soil',
    description: 'Heavy, nutrient-rich soil that holds water well but can be difficult to work with and slow to warm up.',
    crops: ['Cabbage', 'Broccoli', 'Brussels Sprouts', 'Rice', 'Wheat'],
    characteristics: ['Retains water', 'Rich in nutrients', 'Compacts easily', 'Slow to warm up']
  },
  'silty': {
    type: 'Silty Soil',
    description: 'Fertile, moisture-retentive soil that is easy to work with but may compact easily.',
    crops: ['Most vegetables', 'Wetland rice', 'Water-loving grasses', 'Fruit trees'],
    characteristics: ['Retains moisture', 'Rich in nutrients', 'Compacts easily', 'Feels smooth and silky']
  },
  'peaty': {
    type: 'Peaty Soil',
    description: 'Dark, acidic soil with high organic content, good for acid-loving plants but may require drainage.',
    crops: ['Potatoes', 'Root vegetables', 'Blueberries', 'Legumes'],
    characteristics: ['Acidic', 'High in organic matter', 'Retains moisture', 'Slow to warm up']
  },
  'chalky': {
    type: 'Chalky Soil',
    description: 'Alkaline soil that drains freely and warms up quickly, but may lack some nutrients.',
    crops: ['Spinach', 'Beets', 'Sweet Corn', 'Cabbage'],
    characteristics: ['Alkaline', 'Drains well', 'May lack nutrients', 'Contains lime']
  }
};

const cropRecommendationsPerSoilAndStatus: Record<string, CropRecommendation[]> = {
  'sandy-new': [
    {
      name: 'Watermelon',
      suitability: 'High',
      growthPeriod: '70-100 days',
      waterRequirements: 'Moderate (regular deep watering)',
      idealTemperature: '20-30°C',
      notes: 'Sandy soil provides good drainage which watermelons prefer. Plant after all frost danger has passed.'
    },
    {
      name: 'Sweet Potatoes',
      suitability: 'High',
      growthPeriod: '90-170 days',
      waterRequirements: 'Low to moderate',
      idealTemperature: '20-30°C',
      notes: 'Thrives in sandy soil with good drainage. Plant slips when soil temperature reaches 18°C.'
    },
    {
      name: 'Carrots',
      suitability: 'High',
      growthPeriod: '60-80 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-20°C',
      notes: 'Sandy soil allows straight root growth. Can be planted as soon as soil can be worked.'
    }
  ],
  'loamy-new': [
    {
      name: 'Tomatoes',
      suitability: 'High',
      growthPeriod: '60-100 days',
      waterRequirements: 'Moderate (consistent moisture)',
      idealTemperature: '20-27°C',
      notes: 'Loamy soil provides excellent conditions for tomato growth. Plant after frost danger has passed.'
    },
    {
      name: 'Corn',
      suitability: 'High',
      growthPeriod: '60-100 days',
      waterRequirements: 'Moderate to high',
      idealTemperature: '18-24°C',
      notes: 'Corn thrives in nutrient-rich loamy soil. Plant when soil temperature reaches 15°C.'
    },
    {
      name: 'Bell Peppers',
      suitability: 'High',
      growthPeriod: '60-90 days',
      waterRequirements: 'Moderate',
      idealTemperature: '18-30°C',
      notes: 'Loamy soil provides good drainage and nutrients. Plant after all frost danger has passed.'
    }
  ],
  'clay-new': [
    {
      name: 'Cabbage',
      suitability: 'High',
      growthPeriod: '80-180 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-20°C',
      notes: 'Clay soil\'s moisture retention benefits cabbage. Can be planted in early spring or late summer.'
    },
    {
      name: 'Broccoli',
      suitability: 'High',
      growthPeriod: '80-100 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-20°C',
      notes: 'Broccoli thrives in moisture-retentive clay soils. Plant in early spring or fall.'
    },
    {
      name: 'Beans',
      suitability: 'Medium',
      growthPeriod: '50-60 days',
      waterRequirements: 'Moderate',
      idealTemperature: '18-24°C',
      notes: 'Beans can grow well in clay soil with proper drainage. Plant when soil warms to 15°C.'
    }
  ],
  'silty-new': [
    {
      name: 'Leafy Greens',
      suitability: 'High',
      growthPeriod: '30-60 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-20°C',
      notes: 'Silty soil\'s moisture retention is excellent for leafy greens. Can be planted in early spring and fall.'
    },
    {
      name: 'Cucumbers',
      suitability: 'High',
      growthPeriod: '50-70 days',
      waterRequirements: 'High',
      idealTemperature: '20-30°C',
      notes: 'Cucumbers thrive in fertile silty soil. Plant when soil temperature reaches 18°C.'
    },
    {
      name: 'Pumpkins',
      suitability: 'High',
      growthPeriod: '90-120 days',
      waterRequirements: 'Moderate',
      idealTemperature: '18-30°C',
      notes: 'Silty soil provides good nutrition for pumpkins. Plant after all frost danger has passed.'
    }
  ],
  'peaty-new': [
    {
      name: 'Blueberries',
      suitability: 'High',
      growthPeriod: '2-3 years to full production',
      waterRequirements: 'Moderate',
      idealTemperature: '15-24°C',
      notes: 'Blueberries thrive in acidic peaty soil. Plant in early spring.'
    },
    {
      name: 'Potatoes',
      suitability: 'High',
      growthPeriod: '70-120 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-20°C',
      notes: 'Peaty soil\'s acidity and loose structure benefit potatoes. Plant when soil temperature reaches 10°C.'
    },
    {
      name: 'Carrots',
      suitability: 'Medium',
      growthPeriod: '60-80 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-20°C',
      notes: 'Carrots can do well in loose peaty soil. Plant in early spring or late summer.'
    }
  ],
  'chalky-new': [
    {
      name: 'Spinach',
      suitability: 'High',
      growthPeriod: '40-50 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-18°C',
      notes: 'Spinach tolerates alkaline chalky soil well. Plant in early spring or fall.'
    },
    {
      name: 'Cabbage',
      suitability: 'High',
      growthPeriod: '80-180 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-20°C',
      notes: 'Cabbage performs well in chalky soil. Plant in early spring or late summer for fall harvest.'
    },
    {
      name: 'Beets',
      suitability: 'High',
      growthPeriod: '55-70 days',
      waterRequirements: 'Moderate',
      idealTemperature: '15-18°C',
      notes: 'Beets are suitable for chalky soils with good preparation. Plant in early spring or late summer.'
    }
  ],
  'sandy-existing': [
    {
      name: 'Cover Crops (Rye/Clover)',
      suitability: 'High',
      growthPeriod: 'Varies',
      waterRequirements: 'Low',
      idealTemperature: '10-25°C',
      notes: 'In between growing seasons, consider planting cover crops to improve soil structure and fertility.'
    },
    {
      name: 'Crop Rotation',
      suitability: 'High',
      growthPeriod: 'N/A',
      waterRequirements: 'N/A',
      idealTemperature: 'N/A',
      notes: 'Rotate current crops with legumes to fix nitrogen in sandy soil.'
    },
    {
      name: 'Additional Irrigation',
      suitability: 'High',
      growthPeriod: 'N/A',
      waterRequirements: 'N/A',
      idealTemperature: 'N/A',
      notes: 'Sandy soil drains quickly. Consider drip irrigation for existing crops to maintain consistent moisture.'
    }
  ],
  'loamy-existing': [
    {
      name: 'Mulching',
      suitability: 'High',
      growthPeriod: 'N/A',
      waterRequirements: 'N/A',
      idealTemperature: 'N/A',
      notes: 'Apply organic mulch around existing crops to retain moisture and suppress weeds.'
    },
    {
      name: 'Companion Planting',
      suitability: 'High',
      growthPeriod: 'Varies',
      waterRequirements: 'Varies',
      idealTemperature: 'Varies',
      notes: 'Introduce beneficial companion plants between rows to enhance growth and deter pests.'
    },
    {
      name: 'Maintenance Fertilization',
      suitability: 'High',
      growthPeriod: 'N/A',
      waterRequirements: 'N/A',
      idealTemperature: 'N/A',
      notes: 'Apply balanced fertilizers as side dressing for heavy feeding crops.'
    }
  ]
};

const SoilAndCrop: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationName, setLocationName] = useState<string>('');
  const [selectedSoil, setSelectedSoil] = useState<string>('');
  const [farmingStatus, setFarmingStatus] = useState<string>('new');
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Get location from state passed during navigation
  useEffect(() => {
    if (location.state?.locationName) {
      setLocationName(location.state.locationName);
    } else {
      // If no location provided, redirect back to dashboard
      toast.error('No location data. Please select a location first.');
      navigate('/');
    }
  }, [location, navigate]);

  // Show recommendations based on soil and farming status
  const handleViewRecommendations = () => {
    if (!selectedSoil) {
      toast.error('Please select a soil type first');
      return;
    }

    const key = `${selectedSoil}-${farmingStatus}`;
    const recs = cropRecommendationsPerSoilAndStatus[key] || cropRecommendationsPerSoilAndStatus[`${selectedSoil}-new`];
    
    if (recs) {
      setRecommendations(recs);
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      toast.error('No specific recommendations available for this combination');
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
              <CardTitle>Select Your Soil Type</CardTitle>
              <CardDescription>
                Choose the soil type that best matches your farm land
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                value={selectedSoil} 
                onValueChange={setSelectedSoil}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(soilTypes).map(([key, soil]) => (
                    <SelectItem key={key} value={key}>{soil.type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSoil && (
                <div className="mt-4 space-y-3 p-4 bg-muted/40 rounded-lg">
                  <h3 className="font-medium">{soilTypes[selectedSoil].type}</h3>
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
                    {soilTypes[selectedSoil].crops.map((crop, i) => (
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
                disabled={!selectedSoil}
              >
                View Recommendations
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
                  Based on your {soilTypes[selectedSoil].type} and {farmingStatus === 'new' ? 'new farming' : 'existing crops'}
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
