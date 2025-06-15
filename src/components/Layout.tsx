import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Phone, MapPin, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { user } = useSession();
  const { toast } = useToast();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order Online', href: '/order' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Logout handler
  const handleLogout = async () => {
    // Clean up state
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) localStorage.removeItem(key);
      });
    } catch {}
    try {
      await supabase.auth.signOut({ scope: "global" });
    } catch {}
    toast({ title: "Logged out" });
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-restaurant-primary to-restaurant-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Telia Restaurant</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-restaurant-primary border-b-2 border-restaurant-primary'
                      : 'text-gray-700 hover:text-restaurant-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Auth/Login/Logout Button */}
              {user ? (
                <button
                  className="text-gray-700 hover:text-red-500 px-4 py-2 font-medium transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  className={`font-medium transition-colors ${
                    isActive("/auth")
                      ? "text-restaurant-primary border-b-2 border-restaurant-primary"
                      : "text-gray-700 hover:text-restaurant-primary"
                  }`}
                >
                  Login
                </Link>
              )}

              {/* Cart Icon */}
              <Link to="/order" className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-restaurant-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-restaurant-primary"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 animate-slide-in">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-restaurant-primary text-white'
                        : 'text-gray-700 hover:bg-restaurant-warm'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Auth/Login/Logout Button for mobile */}
                {user ? (
                  <button
                    className="px-4 py-2 text-gray-700 hover:text-red-500 font-medium transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 font-medium transition-colors rounded-md ${
                      isActive("/auth")
                        ? "bg-restaurant-primary text-white"
                        : "text-gray-700 hover:bg-restaurant-warm"
                    }`}
                  >
                    Login
                  </Link>
                )}
                <Link
                  to="/order"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-restaurant-warm rounded-md"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart ({cartItemCount})</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Telia Restaurant</h3>
              <p className="text-gray-300 mb-4">
                Authentic Telangana cuisine served with love and tradition. Experience the rich flavors of India in every bite.
              </p>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-gray-300 hover:text-restaurant-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>info@teliarestaurant.com</span>
                </div>
                <div>
                  <span className="font-semibold">Hours:</span>
                  <p>Mon-Sun: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Telia Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
