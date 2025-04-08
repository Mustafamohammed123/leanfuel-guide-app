
import { Home, Calendar, ShoppingCart, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Meals", path: "/meals" },
    { icon: ShoppingCart, label: "Grocery", path: "/grocery" },
    { icon: UserCircle, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-1/4 h-full ${
              pathname === item.path
                ? "text-leanfuel-primary"
                : "text-gray-500"
            }`}
          >
            <item.icon size={20} className="mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
