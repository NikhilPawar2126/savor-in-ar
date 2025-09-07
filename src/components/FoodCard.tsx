import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Star, Clock, Leaf, Flame } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { MenuItem } from "./MenuPage";

interface FoodCardProps {
  item: MenuItem;
  onItemClick: (item: MenuItem) => void;
}

const FoodCard = ({ item, onItemClick }: FoodCardProps) => {
  const handleCardClick = () => {
    onItemClick(item);
  };

  return (
    <Card 
      className="group overflow-hidden bg-gradient-card border-border shadow-card-custom hover:shadow-glow transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {/* Food Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-gradient-food text-primary-foreground rounded-full px-3 py-1">
            <span className="text-lg font-bold">${item.price}</span>
          </div>

          {/* AR Badge */}
          {item.modelUrl && (
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Eye className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">AR</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
            {item.name}
          </h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {item.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span>{item.rating}</span>
              </div>
            )}
            {item.prepTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{item.prepTime}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              {item.isVegetarian && <Leaf className="w-4 h-4 text-success" />}
              {item.isSpicy && <Flame className="w-4 h-4 text-destructive" />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;