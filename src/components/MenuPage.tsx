import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategoryTabs from "./CategoryTabs";
import FoodCard from "./FoodCard";
import Cart from "./Cart";
import { useCart } from "@/hooks/useCart";
import risottoImg from "@/assets/risotto.jpg";
import salmonImg from "@/assets/salmon.jpg";
import calamariImg from "@/assets/calamari.jpg";
import lavaCakeImg from "@/assets/lava-cake.jpg";
import cocktailImg from "@/assets/cocktail.jpg";

interface MenuPageProps {
  onBack?: () => void;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  modelUrl?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  rating?: number;
  prepTime?: string;
}

const sampleMenu: MenuItem[] = [
  {
    id: "1",
    name: "Truffle Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan cheese",
    price: 28,
    image: risottoImg,
    category: "mains",
    modelUrl: "/models/risotto.glb",
    isVegetarian: true,
    rating: 4.8,
    prepTime: "25 min"
  },
  {
    id: "2", 
    name: "Grilled Salmon Teriyaki",
    description: "Fresh Atlantic salmon with teriyaki glaze, steamed vegetables, and jasmine rice",
    price: 32,
    image: salmonImg,
    category: "mains",
    modelUrl: "/models/salmon.glb",
    rating: 4.9,
    prepTime: "20 min"
  },
  {
    id: "3",
    name: "Crispy Calamari",
    description: "Golden fried squid rings with spicy marinara sauce and lemon wedges",
    price: 16,
    image: calamariImg, 
    category: "starters",
    modelUrl: "/models/calamari.glb",
    rating: 4.6,
    prepTime: "15 min"
  },
  {
    id: "4",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream, and berry compote",
    price: 12,
    image: lavaCakeImg,
    category: "desserts", 
    modelUrl: "/models/lava-cake.glb",
    isVegetarian: true,
    rating: 4.9,
    prepTime: "12 min"
  },
  {
    id: "5",
    name: "Craft Cocktail Selection",
    description: "House-made mixers, premium spirits, fresh garnishes",
    price: 14,
    image: cocktailImg,
    category: "drinks",
    rating: 4.7
  }
];

const MenuPage = ({ onBack }: MenuPageProps) => {
  const [showCart, setShowCart] = useState(false);
  const { getTotalItems } = useCart();

  const categories = [
    { id: "starters", name: "Starters", icon: "🥗" },
    { id: "mains", name: "Main Course", icon: "🍖" },
    { id: "desserts", name: "Dessert", icon: "🍰" },
    { id: "drinks", name: "Drinks", icon: "🍹" }
  ];

  const getMenuByCategory = (categoryId: string) => {
    return sampleMenu.filter(item => item.category === categoryId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">TasteAR Menu</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Menu by Categories */}
      <main className="container mx-auto px-6 py-8">
        {categories.map((category) => {
          const categoryItems = getMenuByCategory(category.id);
          if (categoryItems.length === 0) return null;
          
          return (
            <section key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="text-3xl mr-3">{category.icon}</span>
                {category.name}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryItems.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Cart Sidebar */}
      <Cart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </div>
  );
};

export default MenuPage;