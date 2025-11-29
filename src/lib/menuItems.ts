interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string;
  modelUrl: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Crispy Calamari",
    price: "₹450",
    image: "/images/calamari.jpg",
    modelUrl: "/models/calamari.glb"
  },
  {
    id: 2,
    name: "Grilled Sandwich",
    price: "₹350",
    image: "/images/sandwich.jpg",
    modelUrl: "/models/sandwich.glb"
  },
  {
    id: 3,
    name: "Cheese Burger",
    price: "₹550",
    image: "/images/burger.jpg",
    modelUrl: "/models/burger.glb"
  }
];

export default menuItems;
