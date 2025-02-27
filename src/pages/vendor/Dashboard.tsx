
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users2Icon, Truck, ShoppingBagIcon, TrendingUpIcon, UserIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VendorDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const vendorName = user?.firstName || 'Vendor';
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {vendorName}</p>
          </div>
          
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button onClick={() => navigate('/vendor/market-pricing')} className="flex items-center gap-1">
              <ShoppingBagIcon className="h-4 w-4" />
              <span>Update Market Prices</span>
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile')}>
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="mb-6 vendor-theme p-6 rounded-lg">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Farmers Connected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500 mr-1">↑</span> 
                  3 new connections this week
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Pending deliveries</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Price Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2.5%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>From last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Inventory Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-amber-500 mr-1">!</span> 
                  Items low in stock
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs defaultValue="farmers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="farmers" className="flex items-center gap-2">
              <Users2Icon className="h-4 w-4" />
              <span>Farmers</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <ShoppingBagIcon className="h-4 w-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              <span>Market</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Farmers</CardTitle>
                  <CardDescription>
                    Farmers you frequently do business with
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Rajesh Kumar</div>
                          <div className="text-xs text-muted-foreground">Wheat, Rice, Pulses</div>
                        </div>
                      </div>
                      <Button size="sm">Contact</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Anita Singh</div>
                          <div className="text-xs text-muted-foreground">Vegetables, Fruits</div>
                        </div>
                      </div>
                      <Button size="sm">Contact</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Prakash Verma</div>
                          <div className="text-xs text-muted-foreground">Potatoes, Onions</div>
                        </div>
                      </div>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Farmers
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>
                    Latest farmer connections and sale inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <div className="font-medium">Manoj Patel</div>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">New</Badge>
                      </div>
                      <div className="text-sm mt-1">50 quintals of wheat available for sale</div>
                      <div className="text-xs text-muted-foreground mt-1">Location: Haryana, India</div>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline" className="mr-2">Decline</Button>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <div className="font-medium">Sunita Devi</div>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">New</Badge>
                      </div>
                      <div className="text-sm mt-1">Organic vegetables from 2 acre farm</div>
                      <div className="text-xs text-muted-foreground mt-1">Location: Punjab, India</div>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline" className="mr-2">Decline</Button>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <div className="font-medium">Rakesh Sharma</div>
                        <div className="text-xs text-muted-foreground">2 days ago</div>
                      </div>
                      <div className="text-sm mt-1">Rice harvest ready by next month</div>
                      <div className="text-xs text-muted-foreground mt-1">Location: Uttar Pradesh, India</div>
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
          
          <TabsContent value="inventory" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Current Inventory</CardTitle>
                  <CardDescription>
                    Overview of your stock levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Wheat</div>
                        <div className="text-sm text-muted-foreground">Premium quality</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">120 quintals</div>
                        <div className="text-xs text-green-500">Sufficient</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Rice</div>
                        <div className="text-sm text-muted-foreground">Basmati</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">85 quintals</div>
                        <div className="text-xs text-green-500">Sufficient</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Potatoes</div>
                        <div className="text-sm text-muted-foreground">Fresh harvest</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">15 quintals</div>
                        <div className="text-xs text-amber-500">Low stock</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Onions</div>
                        <div className="text-sm text-muted-foreground">Red variety</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">8 quintals</div>
                        <div className="text-xs text-amber-500">Low stock</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Incoming Deliveries</CardTitle>
                  <CardDescription>
                    Expected stock arrivals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div className="font-medium">Wheat</div>
                      </div>
                      <div className="text-sm mt-1">50 quintals</div>
                      <div className="text-xs text-muted-foreground mt-1">Expected: Tomorrow</div>
                      <div className="text-xs mt-2 p-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded flex items-center justify-center">
                        On schedule
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr