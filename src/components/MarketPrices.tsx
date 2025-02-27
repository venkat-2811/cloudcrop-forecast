
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MarketPrice {
  crop: string;
  currentPrice: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  forecast: string;
}

const marketPrices: MarketPrice[] = [
  {
    crop: 'Rice',
    currentPrice: '₹2,850/quintal',
    trend: 'up',
    change: '+2.4%',
    forecast: 'Expected to rise further'
  },
  {
    crop: 'Wheat',
    currentPrice: '₹2,150/quintal',
    trend: 'stable',
    change: '+0.3%',
    forecast: 'Stable prices for next month'
  },
  {
    crop: 'Cotton',
    currentPrice: '₹6,500/quintal',
    trend: 'down',
    change: '-1.8%',
    forecast: 'May decrease slightly'
  },
  {
    crop: 'Maize',
    currentPrice: '₹1,950/quintal',
    trend: 'up',
    change: '+1.5%',
    forecast: 'Gradual increase expected'
  }
];

const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  if (trend === 'up') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="m19 8-7 7-7-7"></path>
      </svg>
    );
  }
  if (trend === 'down') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <path d="m5 16 7-7 7 7"></path>
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
      <path d="M3 12h18"></path>
    </svg>
  );
};

const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
  if (trend === 'up') return 'text-green-500';
  if (trend === 'down') return 'text-red-500';
  return 'text-yellow-500';
};

const MarketPrices: React.FC = () => {
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Market Price Trends</span>
          <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketPrices.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-earth-100 to-earth-300 dark:from-earth-700 dark:to-earth-900 flex items-center justify-center text-earth-800 dark:text-earth-100 font-medium">
                  {item.crop.substring(0, 2)}
                </div>
                <div>
                  <h4 className="font-medium">{item.crop}</h4>
                  <p className="text-sm text-muted-foreground">{item.currentPrice}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {getTrendIcon(item.trend)}
                  <span className={getTrendColor(item.trend)}>{item.change}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.forecast}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPrices;
