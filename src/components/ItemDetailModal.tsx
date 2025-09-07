import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Eye, Star, Clock, Leaf, Flame, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { MenuItem } from "./MenuPage";

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ItemDetailModal = ({ item, isOpen, onClose }: ItemDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!item) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
    onClose();
    setQuantity(1);
  };

  const handleViewAR = () => {
    if (item.modelUrl) {
      alert(`Opening AR view for ${item.name}. In production, this would launch the AR viewer with the 3D model.`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {item.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
            
            {/* Price and Rating Overlay */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-gradient-food text-primary-foreground rounded-full px-4 py-2">
                <span className="text-2xl font-bold">${item.price}</span>
              </div>
              {item.rating && (
                <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-white font-medium">{item.rating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description and Info */}
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.isVegetarian && (
                <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                  <Leaf className="w-3 h-3 mr-1" />
                  Vegetarian
                </Badge>
              )}
              {item.isSpicy && (
                <Badge variant="secondary" className="bg-destructive/20 text-destructive border-destructive/30">
                  <Flame className="w-3 h-3 mr-1" />
                  Spicy
                </Badge>
              )}
              {item.prepTime && (
                <Badge variant="outline" className="border-border">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.prepTime}
                </Badge>
              )}
            </div>

            <Separator />

            {/* Ingredients */}
            {item.ingredients && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="border-border">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition Info */}
            {item.nutritionInfo && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Nutrition Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <div className="font-bold text-foreground">{item.nutritionInfo.calories}</div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <div className="font-bold text-foreground">{item.nutritionInfo.protein}</div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <div className="font-bold text-foreground">{item.nutritionInfo.carbs}</div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <div className="font-bold text-foreground">{item.nutritionInfo.fat}</div>
                    <div className="text-sm text-muted-foreground">Fat</div>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-foreground font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                {item.modelUrl && (
                  <Button
                    onClick={handleViewAR}
                    variant="outline"
                    className="flex-1 border-primary/50 hover:border-primary"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View in AR
                  </Button>
                )}
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-food hover:shadow-food transition-all duration-300"
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add {quantity} to Cart - ${(item.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;