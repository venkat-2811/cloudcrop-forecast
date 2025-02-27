
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import WeatherDashboard from '@/components/WeatherDashboard';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-sm transition-all hover:shadow-md">
    <div className="p-3 rounded-full bg-primary/10 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const Index = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
          <path d="m8 14 2 2 4-4"></path>
        </svg>
      ),
      title: "Weather Forecasting",
      description: "Get accurate, timely weather updates and seasonal forecasts to plan farming activities better."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M12 2v8"></path>
          <path d="m4.93 10.93 1.41 1.41"></path>
          <path d="M2 18h2"></path>
          <path d="M20 18h2"></path>
          <path d="m19.07 10.93-1.41 1.41"></path>
          <path d="M22 22H2"></path>
          <path d="m8 22 4-10 4 10"></path>
          <path d="M12 14v4"></path>
        </svg>
      ),
      title: "Crop Suggestions",
      description: "Receive tailored crop recommendations based on soil health, weather patterns, and historical data."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"></path>
          <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"></path>
          <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"></path>
          <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"></path>
        </svg>
      ),
      title: "Sustainability Guidance",
      description: "Learn sustainable farming practices that improve soil health and reduce environmental impact."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      ),
      title: "Market Price Predictions",
      description: "Stay informed about market trends and get price forecasts to optimize when you sell your crops."
    }
  ];

  return (
    <DashboardLayout>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              CloudCrop AI
            </h1>
            <p className="mx-auto max-w-[42rem] text-muted-foreground sm:text-xl">
              Empowering farmers with climate insights, crop suggestions, and sustainable farming practices
            </p>
          </div>
        </div>
      </section>
      
      <WeatherDashboard />
      
      <section className="py-12">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Index;
