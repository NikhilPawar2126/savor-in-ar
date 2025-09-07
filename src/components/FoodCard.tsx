import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Star, Clock, Leaf, Flame } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { MenuItem } from "./MenuPage";

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard = ({ item }: FoodCardProps) => {
  const { addItem } = useCart();

  const handleViewAR = () => {
    if (item.modelUrl) {
      // Open AR model viewer - for now we'll show an alert
      alert(`Opening AR view for ${item.name}. In production, this would launch the AR viewer with the 3D model.`);
    }
  };

  const handleAddToCart = () => {
    addItem(item);
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border shadow-card-custom hover:shadow-glow transition-all duration-300">
      <CardContent className="p-0">
        {/* Food Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Placeholder for food image */}
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {item.isVegetarian && (
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                <Leaf className="w-3 h-3 mr-1" />
                Veg
              </Badge>
            )}
            {item.isSpicy && (
              <Badge variant="secondary" className="bg-destructive/20 text-destructive border-destructive/30">
                <Flame className="w-3 h-3 mr-1" />
                Spicy
              </Badge>
            )}
          </div>

          {/* Rating */}
          {item.rating && (
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="w-3 h-3 fill-warning text-warning" />
              <span className="text-sm text-white font-medium">{item.rating}</span>
            </div>
          )}
          
          {/* AR Button Overlay */}
          {item.modelUrl && (
            <Button
              onClick={handleViewAR}
              variant="secondary"
              size="sm"
              className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm hover:bg-primary border-white/20 group-hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4 mr-2" />
              View in AR
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <span className="text-xl font-bold text-primary">${item.price}</span>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>

          {/* Prep Time */}
          {item.prepTime && (
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.prepTime}</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-food hover:shadow-food transition-all duration-300 group"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;