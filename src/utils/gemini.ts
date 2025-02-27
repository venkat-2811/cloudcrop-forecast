
import { toast } from 'sonner';

// Interface for the soil information returned by Gemini API
export interface GeminiSoilInfo {
  soilType: string;
  description: string;
  characteristics: string[];
  suitableCrops: string[];
}

// Interface for crop recommendations returned by Gemini API
export interface GeminiCropRecommendation {
  name: string;
  suitability: 'High' | 'Medium' | 'Low';
  growthPeriod: string;
  waterRequirements: string;
  idealTemperature: string;
  notes: string;
}

// Interface for price prediction responses from Gemini API
export interface GeminiPricePrediction {
  crop: string;
  currentPrice: string;
  predictedPrice: string;
  trend: 'up' | 'down' | 'stable';
  factors: string[];
  confidence: number;
}

// Define the Gemini API key (you would replace this with a proper API key)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Get soil types for a specific location using the Gemini API
 */
export async function getSoilTypesForLocation(locationName: string): Promise<Record<string, GeminiSoilInfo> | null> {
  try {
    console.log(`Getting soil types for ${locationName}`);
    
    // Normalize location name for better matching
    const normalizedLocation = locationName.toLowerCase();
    
    // Create prompt for the Gemini API
    const prompt = `Identify the major soil types found in ${locationName}. For each soil type, provide:
    1. A brief description
    2. Key characteristics (as bullet points)
    3. Crops that grow well in this soil (as a list)
    Format the response as a structured JSON object without any explanations outside the JSON structure.`;
    
    // For now, we'll use location-aware mock data while setting up actual API integration
    const mockSoilTypes: Record<string, GeminiSoilInfo> = {};
    
    // More targeted location detection with better geographic handling
    if (normalizedLocation.includes("india")) {
      if (normalizedLocation.includes("punjab") || normalizedLocation.includes("haryana") || normalizedLocation.includes("uttar pradesh")) {
        mockSoilTypes["alluvial"] = {
          soilType: "Alluvial Soil",
          description: "Rich, fertile soil deposited by rivers like the Ganges and its tributaries in the Indo-Gangetic plains.",
          characteristics: ["High fertility", "Good water retention", "Rich in minerals", "Easily tilled", "High in potash"],
          suitableCrops: ["Rice", "Wheat", "Sugarcane", "Maize", "Cotton"]
        };
      }
      
      if (normalizedLocation.includes("maharashtra") || normalizedLocation.includes("gujarat") || normalizedLocation.includes("madhya pradesh")) {
        mockSoilTypes["black"] = {
          soilType: "Black Cotton Soil (Regur)",
          description: "Dark colored soil with high clay content, expands when wet and contracts when dry. Common in the Deccan plateau.",
          characteristics: ["Self-ploughing nature", "Rich in calcium, magnesium and potassium", "Poor drainage when wet", "Deep cracks when dry"],
          suitableCrops: ["Cotton", "Sugarcane", "Jowar", "Wheat", "Linseed", "Sunflower"]
        };
      }
      
      if (normalizedLocation.includes("rajasthan") || normalizedLocation.includes("gujarat")) {
        mockSoilTypes["arid"] = {
          soilType: "Arid/Desert Soil",
          description: "Sandy soil found in western Rajasthan and parts of Gujarat with low moisture retention.",
          characteristics: ["High sand content", "Poor water retention", "Low organic matter", "High permeability"],
          suitableCrops: ["Drought-resistant millets", "Pulses", "Barley", "Guar"]
        };
      }
      
      if (normalizedLocation.includes("kerala") || normalizedLocation.includes("karnataka") || normalizedLocation.includes("tamil")) {
        mockSoilTypes["laterite"] = {
          soilType: "Laterite Soil",
          description: "Leached soil formed under conditions of high rainfall with alternating wet and dry periods.",
          characteristics: ["Rich in iron and aluminum", "Poor in nitrogen", "Acidic nature", "Low fertility"],
          suitableCrops: ["Tea", "Coffee", "Rubber", "Coconut", "Arecanut"]
        };
      }
    } 
    else if (normalizedLocation.includes("united states") || normalizedLocation.includes("usa") || normalizedLocation.includes("america")) {
      if (normalizedLocation.includes("midwest") || normalizedLocation.includes("illinois") || normalizedLocation.includes("iowa") || normalizedLocation.includes("indiana")) {
        mockSoilTypes["mollisol"] = {
          soilType: "Mollisol (Prairie Soil)",
          description: "Fertile agricultural soil with a thick, dark surface layer rich in organic matter.",
          characteristics: ["Deep topsoil", "High natural fertility", "Good structure", "High organic matter content"],
          suitableCrops: ["Corn", "Soybeans", "Wheat", "Alfalfa"]
        };
      }
      
      if (normalizedLocation.includes("california") || normalizedLocation.includes("washington") || normalizedLocation.includes("oregon")) {
        mockSoilTypes["alfisol"] = {
          soilType: "Alfisol",
          description: "Moderately leached soils with a clay-enriched subsoil and high native fertility.",
          characteristics: ["Clay accumulation in B horizon", "Moderate to high fertility", "Good water retention", "Well-structured"],
          suitableCrops: ["Grapes", "Almonds", "Stone fruits", "Vegetables", "Citrus"]
        };
      }
      
      if (normalizedLocation.includes("southeast") || normalizedLocation.includes("georgia") || normalizedLocation.includes("alabama") || normalizedLocation.includes("mississippi")) {
        mockSoilTypes["ultisol"] = {
          soilType: "Ultisol (Red Clay Soil)",
          description: "Deeply weathered, acidic forest soils with relatively low fertility.",
          characteristics: ["Red or yellowish color", "Acidic", "Clay accumulation", "Low natural fertility without amendments"],
          suitableCrops: ["Cotton", "Tobacco", "Soybeans", "Peanuts", "Pines"]
        };
      }
    }
    else if (normalizedLocation.includes("europe")) {
      if (normalizedLocation.includes("uk") || normalizedLocation.includes("england") || normalizedLocation.includes("britain")) {
        mockSoilTypes["brown"] = {
          soilType: "Brown Earth Soil",
          description: "Rich, fertile soil common across much of lowland Britain with temperate climate and deciduous vegetation.",
          characteristics: ["Well-drained", "Good structure", "Moderate fertility", "Slightly acidic to neutral"],
          suitableCrops: ["Wheat", "Barley", "Sugar beet", "Oilseed rape", "Vegetables"]
        };
        
        mockSoilTypes["chalky"] = {
          soilType: "Chalky/Calcareous Soil",
          description: "Alkaline soil with high calcium carbonate content, common in areas with chalk or limestone bedrock.",
          characteristics: ["Alkaline pH (7.5-8.5)", "Drains quickly", "Warms up quickly in spring", "Can be nutrient deficient"],
          suitableCrops: ["Lavender", "Spinach", "Beets", "Cabbage", "Wild flowers"]
        };
      }
      
      if (normalizedLocation.includes("france") || normalizedLocation.includes("italy") || normalizedLocation.includes("spain")) {
        mockSoilTypes["terra"] = {
          soilType: "Terra Rossa",
          description: "Reddish clay soil found in Mediterranean regions, developed on limestone parent material.",
          characteristics: ["Reddish color from iron oxides", "Clay-rich", "Well-drained", "Moderately fertile"],
          suitableCrops: ["Olives", "Vines", "Citrus", "Wheat", "Figs"]
        };
      }
    }
    else if (normalizedLocation.includes("australia")) {
      mockSoilTypes["vertisol"] = {
        soilType: "Vertisol",
        description: "Clay-rich soils that shrink and swell with moisture changes, forming deep cracks when dry.",
        characteristics: ["High clay content", "Self-mulching", "Poor drainage when wet", "Deep cracking when dry"],
        suitableCrops: ["Cotton", "Sorghum", "Wheat", "Chickpeas"]
      };
      
      mockSoilTypes["sodosol"] = {
        soilType: "Sodosol",
        description: "Soils with a strongly sodic B horizon that are hard when dry and prone to erosion.",
        characteristics: ["Dispersive clay subsoil", "Poor structure", "High sodium content", "Susceptible to erosion"],
        suitableCrops: ["Improved pastures", "Salt-tolerant crops", "Some cereals with careful management"]
      };
    }
    
    // If nothing specific was found based on location, add common soil types as fallback
    if (Object.keys(mockSoilTypes).length === 0) {
      mockSoilTypes["loamy"] = {
        soilType: "Loamy Soil",
        description: "Balanced soil type with a good mixture of sand, silt and clay particles.",
        characteristics: ["Good drainage", "High nutrient content", "Retains moisture", "Easy to work with"],
        suitableCrops: ["Most vegetables", "Fruits", "Ornamentals", "Wheat", "Rice"]
      };
      
      mockSoilTypes["sandy"] = {
        soilType: "Sandy Soil",
        description: "Light soil with large particles, drains well but doesn't retain nutrients well.",
        characteristics: ["Drains quickly", "Warms up fast", "Low in nutrients", "Easy to cultivate"],
        suitableCrops: ["Carrots", "Potatoes", "Radishes", "Lettuce", "Strawberries"]
      };
      
      mockSoilTypes["clay"] = {
        soilType: "Clay Soil",
        description: "Heavy soil with fine particles that can be nutrient-rich but drains poorly.",
        characteristics: ["Retains water", "Slow to warm in spring", "Rich in nutrients", "Heavy and difficult to work"],
        suitableCrops: ["Summer vegetables", "Perennial plants", "Wheat", "Beans", "Brassicas"]
      };
    }
    
    return mockSoilTypes;
    
  } catch (error) {
    console.error("Error fetching soil types from Gemini API:", error);
    toast.error("Failed to fetch soil types for this location");
    return null;
  }
}

/**
 * Get crop recommendations for a specific location, soil type, and farming status
 */
export async function getCropRecommendations(
  locationName: string, 
  soilType: string, 
  isNewFarmer: boolean
): Promise<GeminiCropRecommendation[] | null> {
  try {
    console.log(`Getting crop recommendations for ${locationName}, ${soilType}, ${isNewFarmer ? 'new farmer' : 'existing farmer'}`);
    
    // Create prompt for the Gemini API
    const farmerStatus = isNewFarmer ? "beginner farmer who is just starting out" : "farmer with existing crops who needs maintenance advice";
    const prompt = `Provide crop recommendations for a ${farmerStatus} in ${locationName} with ${soilType} soil. 
    For each recommended crop, include:
    1. Crop name
    2. Suitability rating (High, Medium, or Low)
    3. Growth period in days or months
    4. Water requirements (High, Moderate, Low)
    5. Ideal temperature range
    6. Specific notes or tips for this crop in this soil and location
    Format as a structured JSON object without any text outside the JSON structure.`;
    
    // For now, we'll generate location and soil-aware mock recommendations
    const mockRecommendations: GeminiCropRecommendation[] = [];
    const normalizedLocation = locationName.toLowerCase();
    const normalizedSoilType = soilType.toLowerCase();
    
    // Generate recommendations based on location, soil type, and farmer status
    if (normalizedSoilType.includes("alluvial")) {
      mockRecommendations.push({
        name: "Rice",
        suitability: "High",
        growthPeriod: "90-120 days",
        waterRequirements: "High",
        idealTemperature: "25-30°C",
        notes: `Rice thrives in ${locationName}'s alluvial soil. Plant at the onset of monsoon for rainfed cultivation or ensure proper irrigation.`
      });
      mockRecommendations.push({
        name: "Wheat",
        suitability: "High",
        growthPeriod: "120-150 days",
        waterRequirements: "Moderate",
        idealTemperature: "15-24°C",
        notes: "Wheat is an excellent winter crop for alluvial soil. Requires 4-5 irrigations during the growing period."
      });
      mockRecommendations.push({
        name: "Sugarcane",
        suitability: "High",
        growthPeriod: "10-12 months",
        waterRequirements: "High",
        idealTemperature: "20-35°C",
        notes: "Long-term crop with good returns. Requires regular irrigation and proper drainage management."
      });
    } 
    else if (normalizedSoilType.includes("black")) {
      mockRecommendations.push({
        name: "Cotton",
        suitability: "High",
        growthPeriod: "150-180 days",
        waterRequirements: "Moderate",
        idealTemperature: "21-30°C",
        notes: `Cotton is ideal for black soil in ${locationName}. Plant after the first monsoon rains for rainfed cultivation.`
      });
      mockRecommendations.push({
        name: "Pulses (Chickpea/Gram)",
        suitability: "High",
        growthPeriod: "90-120 days",
        waterRequirements: "Low",
        idealTemperature: "15-25°C",
        notes: "Pulses thrive in residual moisture of black soils. Good rotation crop after monsoon cereals."
      });
      mockRecommendations.push({
        name: "Jowar (Sorghum)",
        suitability: "High",
        growthPeriod: "110-130 days",
        waterRequirements: "Low to moderate",
        idealTemperature: "25-32°C",
        notes: "Drought-resistant crop well-suited for black soil regions with uncertain rainfall."
      });
    }
    else if (normalizedSoilType.includes("sandy")) {
      mockRecommendations.push({
        name: "Groundnut",
        suitability: "High",
        growthPeriod: "90-110 days",
        waterRequirements: "Moderate",
        idealTemperature: "25-30°C",
        notes: `Groundnut performs well in sandy soil of ${locationName}. Ensure adequate irrigation at critical growth stages.`
      });
      mockRecommendations.push({
        name: "Watermelon",
        suitability: "High",
        growthPeriod: "80-110 days",
        waterRequirements: "Moderate",
        idealTemperature: "22-30°C",
        notes: "Excellent summer crop for sandy soils. Provides quick returns with proper market linkages."
      });
      mockRecommendations.push({
        name: "Carrots",
        suitability: "High",
        growthPeriod: "70-80 days",
        waterRequirements: "Moderate",
        idealTemperature: "15-20°C",
        notes: "Carrots develop straight roots in sandy soil. Good winter crop with consistent market demand."
      });
    }
    else if (normalizedSoilType.includes("loam")) {
      mockRecommendations.push({
        name: "Tomatoes",
        suitability: "High",
        growthPeriod: "90-120 days",
        waterRequirements: "Moderate",
        idealTemperature: "20-27°C",
        notes: `Tomatoes thrive in loamy soils of ${locationName}. Consider staking or trellising for better yield.`
      });
      mockRecommendations.push({
        name: "Maize (Corn)",
        suitability: "High",
        growthPeriod: "90-120 days",
        waterRequirements: "Moderate",
        idealTemperature: "18-27°C",
        notes: "Maize is a versatile crop for loamy soils. Can be grown in multiple seasons with proper varieties."
      });
      mockRecommendations.push({
        name: "Potatoes",
        suitability: "High",
        growthPeriod: "75-120 days",
        waterRequirements: "Moderate",
        idealTemperature: "15-20°C",
        notes: "Potatoes yield well in loose, fertile loamy soil. Best grown in cooler seasons."
      });
    } 
    else if (normalizedSoilType.includes("clay")) {
      mockRecommendations.push({
        name: "Rice",
        suitability: "High",
        growthPeriod: "90-120 days",
        waterRequirements: "High",
        idealTemperature: "25-30°C",
        notes: `Rice is well-suited to clay soils in ${locationName} due to water retention capacity.`
      });
      mockRecommendations.push({
        name: "Cabbage",
        suitability: "High",
        growthPeriod: "70-120 days",
        waterRequirements: "Moderate",
        idealTemperature: "15-20°C",
        notes: "Cabbage performs well in clay soils during cooler seasons. Ensure proper drainage."
      });
      mockRecommendations.push({
        name: "Broccoli",
        suitability: "High",
        growthPeriod: "80-100 days",
        waterRequirements: "Moderate",
        idealTemperature: "15-20°C",
        notes: "Broccoli is a nutritious crop for clay soils. Best grown in winter months."
      });
    }
    
    // Add recommendations for new farmers vs existing farmers
    if (isNewFarmer) {
      mockRecommendations.push({
        name: "Easy-to-Grow Greens",
        suitability: "High",
        growthPeriod: "30-45 days",
        waterRequirements: "Moderate",
        idealTemperature: "15-25°C",
        notes: "For beginners, leafy greens like spinach, amaranth, and fenugreek offer quick returns and are relatively easy to manage."
      });
    } else {
      mockRecommendations.push({
        name: "Crop Rotation Strategy",
        suitability: "High",
        growthPeriod: "Seasonal",
        waterRequirements: "Varies",
        idealTemperature: "Varies",
        notes: `For established farms in ${locationName}, implement legume-cereal rotation to maintain soil fertility and break pest cycles.`
      });
    }
    
    return mockRecommendations;
    
  } catch (error) {
    console.error("Error fetching crop recommendations from Gemini API:", error);
    toast.error("Failed to fetch crop recommendations");
    return null;
  }
}

/**
 * Get price predictions for crops based on historical data and market trends
 */
export async function getPricePredictions(
  crop: string,
  location: string,
  currentPrice: number
): Promise<GeminiPricePrediction | null> {
  try {
    console.log(`Getting price predictions for ${crop} in ${location} at current price ${currentPrice}`);
    
    // Create prompt for the Gemini API
    const prompt = `Analyze market trends and provide a price prediction for ${crop} in ${location}.
    The current price is ${currentPrice} per kg.
    Consider:
    1. Seasonal trends for this crop
    2. Supply and demand factors
    3. Weather conditions in the region
    4. Previous price patterns
    
    Provide your response as a structured JSON with:
    1. The crop name
    2. Current price
    3. Predicted price for the next month
    4. Price trend (up/down/stable)
    5. Key factors influencing the prediction (as bullet points)
    6. Confidence level (0-100%)`;
    
    // For demonstration, create a mock prediction based on inputs
    const normalizedCrop = crop.toLowerCase();
    const normalizedLocation = location.toLowerCase();
    
    // Generate a realistic price prediction
    let predictedPrice = currentPrice;
    let trend: 'up' | 'down' | 'stable' = 'stable';
    let factors: string[] = [];
    let confidence = 75;
    
    // Simulate seasonal trends and location factors
    const isIndia = normalizedLocation.includes('india');
    const isUS = normalizedLocation.includes('united states') || normalizedLocation.includes('usa');
    
    if (normalizedCrop.includes('rice')) {
      if (isIndia) {
        predictedPrice = currentPrice * 1.08; // 8% increase
        trend = 'up';
        factors = [
          "Approaching harvest season with lower-than-expected yields",
          "Government procurement at higher MSP",
          "Increased export demand",
          "Slight decrease in cultivated area this season"
        ];
        confidence = 82;
      } else {
        predictedPrice = currentPrice * 0.97; // 3% decrease
        trend = 'down';
        factors = [
          "Good harvest expected in major producing regions",
          "Increased imports from Southeast Asia",
          "Stable consumer demand",
          "Favorable weather conditions"
        ];
        confidence = 78;
      }
    } 
    else if (normalizedCrop.includes('tomato')) {
      if (isIndia && (normalizedLocation.includes('north') || normalizedLocation.includes('delhi'))) {
        predictedPrice = currentPrice * 1.3; // 30% increase
        trend = 'up';
        factors = [
          "Seasonal shortage due to end of winter crop",
          "Summer crop not yet harvested",
          "Increased transportation costs",
          "Recent unseasonal rains damaging crops"
        ];
        confidence = 85;
      } else if (isIndia && (normalizedLocation.includes('south') || normalizedLocation.includes('bangalore'))) {
        predictedPrice = currentPrice * 0.9; // 10% decrease
        trend = 'down';
        factors = [
          "Peak production season in southern regions",
          "Good monsoon leading to bumper crops",
          "Limited interstate movement due to quality concerns",
          "Local surplus production"
        ];
        confidence = 80;
      } else {
        predictedPrice = currentPrice * 1.05; // 5% increase
        trend = 'up';
        factors = [
          "Seasonal fluctuations",
          "Increasing production costs",
          "Steady demand from processing industry",
          "Transportation and storage constraints"
        ];
        confidence = 70;
      }
    }
    else if (normalizedCrop.includes('onion')) {
      if (isIndia) {
        predictedPrice = currentPrice * 1.15; // 15% increase
        trend = 'up';
        factors = [
          "Seasonal depletion of stored rabi crop",
          "Late kharif arrival in markets",
          "Export demand remaining strong",
          "Government restrictions on storage to prevent hoarding"
        ];
        confidence = 88;
      } else {
        predictedPrice = currentPrice * 1.02; // 2% increase
        trend = 'stable';
        factors = [
          "Stable production in major growing areas",
          "Consistent import supplies",
          "Steady demand patterns",
          "Adequate storage infrastructure"
        ];
        confidence = 75;
      }
    }
    else if (normalizedCrop.includes('potato')) {
      predictedPrice = currentPrice * 0.95; // 5% decrease
      trend = 'down';
      factors = [
        "Fresh harvest arriving in markets",
        "Good production volumes reported",
        "Adequate cold storage stocks",
        "Stable demand from processing sector"
      ];
      confidence = 82;
    }
    else {
      // Generic prediction for other crops
      // Randomly determine trend with slightly higher chance of increase
      const random = Math.random();
      if (random < 0.4) {
        predictedPrice = currentPrice * (1 + (random * 0.15)); // Up to 15% increase
        trend = 'up';
        factors = [
          "Seasonal demand increases expected",
          "Reported production challenges in some regions",
          "Rising input and transportation costs",
          "Consistent consumer demand"
        ];
      } else if (random < 0.7) {
        predictedPrice = currentPrice * (1 - (random * 0.08)); // Up to 8% decrease
        trend = 'down';
        factors = [
          "Approaching peak harvest season",
          "Good weather conditions in production areas",
          "Increased supplies in local markets",
          "Competition from imported products"
        ];
      } else {
        predictedPrice = currentPrice * (1 + ((random - 0.5) * 0.05)); // +/- 2.5%
        trend = 'stable';
        factors = [
          "Balanced supply and demand",
          "Consistent production patterns",
          "Stable input costs",
          "Predictable market demand"
        ];
      }
      confidence = 65 + Math.floor(random * 15); // 65-80% confidence for generic predictions
    }
    
    // Format the predicted price to two decimal places
    const formattedPredictedPrice = predictedPrice.toFixed(2);
    
    return {
      crop,
      currentPrice: `₹${currentPrice.toFixed(2)}/kg`,
      predictedPrice: `₹${formattedPredictedPrice}/kg`,
      trend,
      factors,
      confidence
    };
    
  } catch (error) {
    console.error("Error getting price prediction from Gemini API:", error);
    toast.error("Failed to generate price prediction");
    return null;
  }
}

/**
 * In a real implementation, this function would make an actual API call to Gemini
 * This is just a placeholder showing the structure of how it would work
 */
async function callGeminiAPI(prompt: string): Promise<any> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
