
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, BarChart3Icon, LeafIcon, DollarSignIcon, ArrowUpRightIcon } from 'lucide-react';
import WeatherDashboard from '@/components/WeatherDashboard';

const FarmerDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const farmerName = user?.firstName || 'Farmer';
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {farmerName}</p>
          </div>
          
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button onClick={() => navigate('/farmer/price-prediction')} className="flex items-center gap-1">
              <DollarSignIcon className="h-4 w-4" />
              <span>Price Predictions</span>
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile')}>
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="mb-6 farmer-theme p-6 rounded-lg">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Good</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500 mr-1">↑</span> 
                  Improving with recent rainfall
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Weather Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Clear</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Ideal for harvesting</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Market Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2450<span className="text-sm font-normal">/q</span></div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500 mr-1">↑</span> 
                  5% from last week
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Buyer Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-amber-500 mr-1">↑</span> 
                  New inquiries today
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs defaultValue="weather" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
            <TabsTrigger value="crops" className="flex items-center gap-2">
              <LeafIcon className="h-4 w-4" />
              <span>Crops</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              <span>Market</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weather" className="space-y-4">
            <WeatherDashboard />
          </TabsContent>
          
          <TabsContent value="crops" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Crops</CardTitle>
                  <CardDescription>
                    Manage your current growing crops
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Wheat</div>
                        <div className="text-sm text-muted-foreground">5 acres, planted on 15th Nov</div>
                      </div>
                      <div className="text-green-500 font-medium">Healthy</div>
                    </div>
                    
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Rice</div>
                        <div className="text-sm text-muted-foreground">3 acres, planted on 10th Jun</div>
                      </div>
                      <div className="text-amber-500 font-medium">Needs water</div>
                    </div>
                    
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Potatoes</div>
                        <div className="text-sm text-muted-foreground">1 acre, planted on 5th Jan</div>
                      </div>
                      <div className="text-green-500 font-medium">Ready to harvest</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/soil-and-crop')}>
                    Add New Crop
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Crop Recommendations</CardTitle>
                  <CardDescription>
                    Based on your soil type and local weather
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Mustard</div>
                        <div className="text-sm text-muted-foreground">Best planting time: October-November</div>
                      </div>
                      <div className="text-green-500 font-medium flex items-center">
                        <span>90%</span>
                        <ArrowUpRightIcon className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Maize</div>
                        <div className="text-sm text-muted-foreground">Best planting time: June-July</div>
                      </div>
                      <div className="text-green-500 font-medium flex items-center">
                        <span>85%</span>
                        <ArrowUpRightIcon className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Chickpeas</div>
                        <div className="text-sm text-muted-foreground">Best planting time: October-November</div>
                      </div>
                      <div className="text-amber-500 font-medium flex items-center">
                        <span>75%</span>
                        <ArrowUpRightIcon className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/soil-and-crop')}>
                    View All Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="market" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Market Prices</CardTitle>
                  <CardDescription>
                    Current prices at nearby markets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Wheat</div>
                        <div className="text-sm text-muted-foreground">Local Grain Market</div>
                      </div>
                      <div className="font-medium">₹2450/quintal</div>
                    </div>
                    
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Rice</div>
                        <div className="text-sm text-muted-foreground">Regional Agricultural Market</div>
                      </div>
                      <div className="font-medium">₹3200/quintal</div>
                    </div>
                    
                    <div className="flex justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium">Potatoes</div>
                        <div className="text-sm text-muted-foreground">Wholesale Vegetable Market</div>
                      </div>
                      <div className="font-medium">₹1250/quintal</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/farmer/price-prediction')}>
                    View Price Predictions
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Buyer Inquiries</CardTitle>
                  <CardDescription>
                    Recent inquiries from vendors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between">
                        <div className="font-medium">Delhi Wholesale Foods</div>
                        <div className="text-xs text-muted-foreground">Today</div>
                      </div>
                      <div className="text-sm mt-1">Looking to purchase 50 quintals of wheat</div>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline" className="mr-2">Decline</Button>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                    
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between">
                        <div className="font-medium">SunFresh Produce</div>
                        <div className="text-xs text-muted-foreground">Yesterday</div>
                      </div>
                      <div className="text-sm mt-1">Interested in organic potatoes, 10 quintals</div>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline" className="mr-2">Decline</Button>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                    
                    <div className="p-2 border rounded-lg">
                      <div className="flex justify-between">
                        <div className="font-medium">Green Valley Markets</div>
                        <div className="text-xs text-muted-foreground">2 days ago</div>
                      </div>
                      <div className="text-sm mt-1">Regular buyer interested in all vegetables</div>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline" className="mr-2">Decline</Button>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
