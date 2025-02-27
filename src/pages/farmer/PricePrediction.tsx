
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Loader2, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { getPricePredictions } from '@/utils/gemini';
import type { GeminiPricePrediction } from '@/utils/gemini';

const mockHistoricalData = [
  { month: 'Jan', price: 2100 },
  { month: 'Feb', price: 2250 },
  { month: 'Mar', price: 2380 },
  { month: 'Apr', price: 2420 },
  { month: 'May', price: 2300 },
  { month: 'Jun', price: 2180 },
  { month: 'Jul', price: 2050 },
  { month: 'Aug', price: 1950 },
  { month: 'Sep', price: 2000 },
  { month: 'Oct', price: 2150 },
  { month: 'Nov', price: 2350 },
  { month: 'Dec', price: 2450 },
];

// Insert future prediction point
const generateExtendedData = (data: typeof mockHistoricalData, prediction: number) => {
  const result = [...data];
  
  // Get the last month and add the next month
  const lastMonth = data[data.length - 1].month;
  let nextMonth: string;
  
  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const lastIndex = monthOrder.indexOf(lastMonth);
  
  if (lastIndex === monthOrder.length - 1) {
    nextMonth = monthOrder[0]; // Wrap around to January
  } else {
    nextMonth = monthOrder[lastIndex + 1];
  }
  
  result.push({ month: nextMonth, price: prediction });
  return result;
};

const PricePrediction: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<string>('wheat');
  const [location, setLocation] = useState<string>('Delhi, India');
  const [currentPrice, setCurrentPrice] = useState<string>('2450');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<GeminiPricePrediction | null>(null);
  const [chartData, setChartData] = useState<typeof mockHistoricalData>(mockHistoricalData);
  
  const handleGeneratePrediction = async () => {
    if (!selectedCrop || !location || !currentPrice) {
      toast.error('Please fill all fields before generating a prediction');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await getPricePredictions(
        selectedCrop, 
        location, 
        parseFloat(currentPrice)
      );
      
      if (result) {
        setPrediction(result);
        
        // Update chart data with prediction
        const predictionValue = parseFloat(result.predictedPrice.replace(/[^\d.]/g, ''));
        const newChartData = generateExtendedData(mockHistoricalData, predictionValue);
        setChartData(newChartData);
        
        toast.success('Price prediction generated successfully!');
      } else {
        toast.error('Failed to generate prediction. Please try again.');
      }
    } catch (error) {
      console.error('Error generating prediction:', error);
      toast.error('An error occurred while generating prediction');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Crop Price Prediction</h1>
            <p className="text-muted-foreground">Get AI-powered price forecasts for your crops</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/farmer/dashboard')} className="mt-2 md:mt-0">
            Back to Dashboard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Prediction Parameters</CardTitle>
              <CardDescription>
                Enter details to get accurate price predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop">Crop</Label>
                  <Select 
                    value={selectedCrop} 
                    onValueChange={setSelectedCrop}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="maize">Maize (Corn)</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="tomato">Tomato</SelectItem>
                      <SelectItem value="onion">Onion</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="soybean">Soybean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, State, Country" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentPrice">Current Price (₹/quintal)</Label>
                  <Input 
                    id="currentPrice" 
                    placeholder="Enter current market price" 
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                  />
                </div>
                
                <Button 
                  type="button" 
                  className="w-full"
                  onClick={handleGeneratePrediction}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Prediction'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Price Forecast</CardTitle>
              <CardDescription>
                Historical and predicted price trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                      name="Price (₹/quintal)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {prediction && (
                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Price Prediction for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Current Price</div>
                      <div className="text-lg font-medium">{prediction.currentPrice}</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Predicted Price</div>
                      <div className="text-lg font-medium flex items-center">
                        {prediction.predictedPrice}
                        {prediction.trend === 'up' && <ArrowUp className="ml-1 text-green-500 h-4 w-4" />}
                        {prediction.trend === 'down' && <ArrowDown className="ml-1 text-red-500 h-4 w-4" />}
                        {prediction.trend === 'stable' && <Minus className="ml-1 text-amber-500 h-4 w-4" />}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Confidence Level</div>
                      <div className="text-lg font-medium">{prediction.confidence}%</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Factors Affecting Price:</h4>
                    <ul className="text-sm space-y-1">
                      {prediction.factors.map((factor, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span> {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PricePrediction;
