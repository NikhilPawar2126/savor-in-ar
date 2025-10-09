import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import FoodCard from "./FoodCard";
import Cart from "./Cart";
import ItemDetailModal from "./ItemDetailModal";
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
  ingredients?: string[];
  nutritionInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
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
    prepTime: "25 min",
    ingredients: ["Arborio Rice", "Wild Mushrooms", "Truffle Oil", "Parmesan", "White Wine", "Vegetable Broth", "Onions", "Garlic"],
    nutritionInfo: {
      calories: 420,
      protein: "12g",
      carbs: "58g", 
      fat: "16g"
    }
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
    prepTime: "20 min",
    ingredients: ["Atlantic Salmon", "Teriyaki Sauce", "Jasmine Rice", "Broccoli", "Carrots", "Snow Peas", "Sesame Seeds"],
    nutritionInfo: {
      calories: 520,
      protein: "35g",
      carbs: "45g",
      fat: "18g"
    }
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
    prepTime: "15 min",
    ingredients: ["Fresh Squid", "Flour", "Cornmeal", "Marinara Sauce", "Lemon", "Parsley", "Red Pepper Flakes"],
    nutritionInfo: {
      calories: 280,
      protein: "18g",
      carbs: "22g",
      fat: "14g"
    }
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
    prepTime: "12 min",
    ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla Ice Cream", "Mixed Berries"],
    nutritionInfo: {
      calories: 450,
      protein: "8g",
      carbs: "52g",
      fat: "24g"
    }
  },
  {
    id: "5",
    name: "Craft Cocktail Selection",
    description: "House-made mixers, premium spirits, fresh garnishes",
    price: 14,
    image: cocktailImg,
    category: "drinks",
    modelUrl: "/models/cocktail.glb",
    rating: 4.7,
    prepTime: "5 min",
    ingredients: ["Premium Spirits", "Fresh Citrus", "House-made Syrups", "Bitters", "Garnishes"],
    nutritionInfo: {
      calories: 180,
      protein: "0g",
      carbs: "12g",
      fat: "0g"
    }
  }
];

const MenuPage = ({ onBack }: MenuPageProps) => {
  const [showCart, setShowCart] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
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

  const scrollToSection = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
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

      {/* Navigation */}
      <nav className="sticky top-[88px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => scrollToSection(category.id)}
                className="flex items-center space-x-2 whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu by Categories */}
      <main className="container mx-auto px-6 py-8">
        {categories.map((category) => {
          const categoryItems = getMenuByCategory(category.id);
          if (categoryItems.length === 0) return null;
          
          return (
            <section key={category.id} id={`category-${category.id}`} className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="text-3xl mr-3">{category.icon}</span>
                {category.name}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryItems.map((item) => (
                  <FoodCard key={item.id} item={item} onItemClick={handleItemClick} />
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

      {/* Item Detail Modal */}
      <ItemDetailModal 
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default MenuPage;