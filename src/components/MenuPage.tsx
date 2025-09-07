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
  onBack: () => void;
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
  const [selectedCategory, setSelectedCategory] = useState("starters");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { items, getTotalItems } = useCart();

  const categories = [
    { id: "starters", name: "Starters", icon: "🥗" },
    { id: "mains", name: "Mains", icon: "🍖" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
    { id: "drinks", name: "Drinks", icon: "🍹" }
  ];

  const filteredMenu = sampleMenu.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Menu</h1>
            </div>
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
          
          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="sticky top-[120px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Menu Items */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMenu.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No dishes found matching your search.</p>
          </div>
        )}
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