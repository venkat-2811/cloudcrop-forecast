
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CropRecommendation {
  name: string;
  confidence: number;
  season: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  estimatedYield: string;
}

const cropRecommendations: CropRecommendation[] = [
  {
    name: 'Rice',
    confidence: 85,
    season: 'Monsoon',
    waterRequirement: 'High',
    estimatedYield: '3.5-4.2 tons/hectare'
  },
  {
    name: 'Wheat',
    confidence: 78,
    season: 'Winter',
    waterRequirement: 'Medium',
    estimatedYield: '2.8-3.5 tons/hectare'
  },
  {
    name: 'Cotton',
    confidence: 72,
    season: 'Summer',
    waterRequirement: 'Medium',
    estimatedYield: '1.8-2.2 tons/hectare'
  },
  {
    name: 'Maize',
    confidence: 68,
    season: 'Spring/Summer',
    waterRequirement: 'Medium',
    estimatedYield: '2.5-3.0 tons/hectare'
  }
];

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return 'bg-green-500/10 text-green-500';
  if (confidence >= 70) return 'bg-amber-500/10 text-amber-500';
  return 'bg-red-500/10 text-red-500';
};

const getWaterRequirementColor = (requirement: 'Low' | 'Medium' | 'High') => {
  if (requirement === 'Low') return 'bg-sky-400/10 text-sky-400';
  if (requirement === 'Medium') return 'bg-sky-500/10 text-sky-500';
  return 'bg-sky-600/10 text-sky-600';
};

const CropRecommendations: React.FC = () => {
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Crop Recommendations</span>
          <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cropRecommendations.map((crop, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-forest-100 to-forest-300 dark:from-forest-700 dark:to-forest-900 flex items-center justify-center text-forest-800 dark:text-forest-100 font-bold">
                {crop.name.substring(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium truncate">{crop.name}</h4>
                  <Badge variant="secondary" className={getConfidenceColor(crop.confidence)}>
                    {crop.confidence}% Match
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="mr-2">{crop.season}</span>
                  <span className="mx-2">•</span>
                  <Badge variant="outline" className={getWaterRequirementColor(crop.waterRequirement)}>
                    {crop.waterRequirement} Water
                  </Badge>
                  <span className="mx-2">•</span>
                  <span>{crop.estimatedYield}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CropRecommendations;
