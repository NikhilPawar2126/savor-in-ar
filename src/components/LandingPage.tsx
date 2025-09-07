import { Button } from "@/components/ui/button";
import { Scan, Camera, ChefHat, Sparkles } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--primary-glow)/0.1),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--food-secondary)/0.1),transparent)] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-food rounded-xl flex items-center justify-center shadow-food">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TasteAR</h1>
              <p className="text-sm text-muted-foreground">Restaurant Demo</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Camera className="w-4 h-4" />
            <span className="text-sm">AR Ready</span>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gradient-food text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-glow">
            <Sparkles className="w-4 h-4" />
            <span>Experience the Future of Dining</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Scan. See. <span className="bg-gradient-food bg-clip-text text-transparent">Savor.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            Experience dishes in stunning 3D before you order. See exactly how your food will look on your table with augmented reality.
          </p>

          {/* CTA Button */}
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-gradient-food hover:shadow-food transition-all duration-300 text-lg px-8 py-6 rounded-xl group"
          >
            <Scan className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            Start AR Experience
          </Button>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          {[
            {
              icon: <Scan className="w-8 h-8" />,
              title: "Instant Access",
              description: "Scan QR code to open menu instantly. No app downloads required."
            },
            {
              icon: <Camera className="w-8 h-8" />,
              title: "AR Preview",
              description: "See dishes in 3D on your table before ordering. Rotate, zoom, and explore."
            },
            {
              icon: <ChefHat className="w-8 h-8" />,
              title: "Full Menu",
              description: "Browse complete menu with prices, descriptions, and nutritional info."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gradient-card border border-border rounded-2xl p-6 shadow-card-custom hover:shadow-glow transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-food rounded-xl flex items-center justify-center mb-4 text-primary-foreground">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;