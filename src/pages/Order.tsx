
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const Order = () => {
  const { items, addItem, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('starters');

  const menuData = {
    starters: [
      { id: 's1', name: 'Veg Manchurian Dry', price: 120, category: 'starters' },
      { id: 's2', name: 'Gobi 65', price: 130, category: 'starters' },
      { id: 's3', name: 'Paneer Tikka', price: 160, category: 'starters' },
      { id: 's4', name: 'Chicken 65', price: 180, category: 'starters' },
      { id: 's5', name: 'Chicken Lollipop (6 pcs)', price: 200, category: 'starters' },
      { id: 's6', name: 'Fish Fingers', price: 220, category: 'starters' }
    ],
    mainCourse: [
      { id: 'm1', name: 'Veg Thali', price: 140, category: 'mainCourse' },
      { id: 'm2', name: 'Dal Tadka', price: 100, category: 'mainCourse' },
      { id: 'm3', name: 'Paneer Butter Masala', price: 170, category: 'mainCourse' },
      { id: 'm4', name: 'Butter Chicken', price: 200, category: 'mainCourse' },
      { id: 'm5', name: 'Chicken Curry', price: 180, category: 'mainCourse' },
      { id: 'm6', name: 'Mutton Rogan Josh', price: 250, category: 'mainCourse' },
      { id: 'm7', name: 'Egg Curry', price: 130, category: 'mainCourse' },
      { id: 'm8', name: 'Chapati (per piece)', price: 15, category: 'mainCourse' },
      { id: 'm9', name: 'Butter Naan', price: 25, category: 'mainCourse' }
    ],
    biryani: [
      { id: 'b1', name: 'Veg Biryani', price: 140, category: 'biryani' },
      { id: 'b2', name: 'Egg Biryani', price: 150, category: 'biryani' },
      { id: 'b3', name: 'Chicken Dum Biryani', price: 200, category: 'biryani' },
      { id: 'b4', name: 'Mutton Biryani', price: 250, category: 'biryani' },
      { id: 'b5', name: 'Boneless Chicken Biryani', price: 230, category: 'biryani' },
      { id: 'b6', name: 'Special Family Chicken Biryani', price: 500, category: 'biryani' }
    ],
    chinese: [
      { id: 'c1', name: 'Veg Noodles', price: 120, category: 'chinese' },
      { id: 'c2', name: 'Chicken Noodles', price: 150, category: 'chinese' },
      { id: 'c3', name: 'Veg Fried Rice', price: 130, category: 'chinese' },
      { id: 'c4', name: 'Chicken Fried Rice', price: 160, category: 'chinese' },
      { id: 'c5', name: 'Schezwan Fried Rice (Veg)', price: 140, category: 'chinese' },
      { id: 'c6', name: 'Schezwan Fried Rice (Chicken)', price: 170, category: 'chinese' },
      { id: 'c7', name: 'Chilli Chicken (Dry/Gravy)', price: 180, category: 'chinese' }
    ],
    desserts: [
      { id: 'd1', name: 'Gulab Jamun (2 pcs)', price: 40, category: 'desserts' },
      { id: 'd2', name: 'Ice Cream (Vanilla/Strawberry)', price: 60, category: 'desserts' },
      { id: 'd3', name: 'Double Ka Meetha', price: 70, category: 'desserts' },
      { id: 'd4', name: 'Qubani Ka Meetha', price: 80, category: 'desserts' }
    ],
    drinks: [
      { id: 'dr1', name: 'Mineral Water (500 ml)', price: 20, category: 'drinks' },
      { id: 'dr2', name: 'Soft Drinks (Coke/Pepsi)', price: 40, category: 'drinks' },
      { id: 'dr3', name: 'Sweet Lassi', price: 50, category: 'drinks' },
      { id: 'dr4', name: 'Masala Chaas', price: 40, category: 'drinks' },
      { id: 'dr5', name: 'Fresh Lime Soda', price: 50, category: 'drinks' },
      { id: 'dr6', name: 'Filter Coffee', price: 30, category: 'drinks' },
      { id: 'dr7', name: 'Tea', price: 20, category: 'drinks' }
    ]
  };

  const categories = [
    { key: 'starters', title: 'Starters', icon: '🥗' },
    { key: 'mainCourse', title: 'Main Course', icon: '🍛' },
    { key: 'biryani', title: 'Biryani', icon: '🍲' },
    { key: 'chinese', title: 'Chinese', icon: '🍜' },
    { key: 'desserts', title: 'Desserts', icon: '🍨' },
    { key: 'drinks', title: 'Drinks', icon: '🥤' }
  ];

  const getItemQuantity = (itemId: string) => {
    const item = items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Please add items to your cart before checkout');
      return;
    }
    
    alert(`Thank you for your order! Total: ₹${getTotal()}\n\nWe'll contact you shortly to confirm your order and delivery details.`);
    clearCart();
  };

  return (
    <div className="min-h-screen py-8 bg-restaurant-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Order Online</h1>
          <p className="text-xl text-gray-600">Select your favorite dishes and get them delivered hot!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Items */}
          <div className="flex-1">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  variant={activeCategory === category.key ? "default" : "outline"}
                  className={`${activeCategory === category.key 
                    ? 'bg-restaurant-primary hover:bg-restaurant-primary/90' 
                    : 'hover:bg-restaurant-primary hover:text-white'
                  }`}
                >
                  {category.icon} {category.title}
                </Button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {menuData[activeCategory as keyof typeof menuData].map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                        <p className="text-2xl font-bold text-restaurant-primary">₹{item.price}</p>
                      </div>
                    </div>
                    
                    {getItemQuantity(item.id) === 0 ? (
                      <Button 
                        onClick={() => addItem(item)}
                        className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between">
                        <Button
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                          variant="outline"
                          size="sm"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-lg mx-4">{getItemQuantity(item.id)}</span>
                        <Button
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                          variant="outline"
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24">
              <CardHeader className="bg-restaurant-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Cart
                  {items.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {items.reduce((total, item) => total + item.quantity, 0)}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {items.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-restaurant-primary font-semibold">₹{item.price} × {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              onClick={() => removeItem(item.id)}
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-lg">Total:</span>
                        <span className="font-bold text-2xl text-restaurant-primary">₹{getTotal()}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          onClick={handleCheckout}
                          className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                          size="lg"
                        >
                          Proceed to Checkout
                        </Button>
                        <Button 
                          onClick={clearCart}
                          variant="outline"
                          className="w-full"
                        >
                          Clear Cart
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
