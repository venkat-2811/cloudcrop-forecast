
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from "@clerk/clerk-react";
import Index from "./pages/Index";
import SoilAndCrop from "./pages/SoilAndCrop";
import FarmerDashboard from "./pages/farmer/Dashboard";
import VendorDashboard from "./pages/vendor/Dashboard";
import MarketPricing from "./pages/vendor/MarketPricing";
import PricePrediction from "./pages/farmer/PricePrediction";
import UserProfile from "./pages/UserProfile";
import AuthWrapper from "./components/AuthWrapper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          
          {/* Authentication routes */}
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
          
          {/* Protected routes requiring authentication */}
          <Route path="/soil-and-crop" element={
            <AuthWrapper>
              <SoilAndCrop />
            </AuthWrapper>
          } />
          
          <Route path="/profile" element={
            <AuthWrapper>
              <UserProfile />
            </AuthWrapper>
          } />
          
          {/* Farmer-specific routes */}
          <Route path="/farmer/dashboard" element={
            <AuthWrapper userType="farmer">
              <FarmerDashboard />
            </AuthWrapper>
          } />
          
          <Route path="/farmer/price-prediction" element={
            <AuthWrapper userType="farmer">
              <PricePrediction />
            </AuthWrapper>
          } />
          
          {/* Vendor-specific routes */}
          <Route path="/vendor/dashboard" element={
            <AuthWrapper userType="vendor">
              <VendorDashboard />
            </AuthWrapper>
          } />
          
          <Route path="/vendor/market-pricing" element={
            <AuthWrapper userType="vendor">
              <MarketPricing />
            </AuthWrapper>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
