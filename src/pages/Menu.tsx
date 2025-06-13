
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Menu = () => {
  const menuData = {
    starters: [
      { name: 'Veg Manchurian Dry', price: 120 },
      { name: 'Gobi 65', price: 130 },
      { name: 'Paneer Tikka', price: 160 },
      { name: 'Chicken 65', price: 180 },
      { name: 'Chicken Lollipop (6 pcs)', price: 200 },
      { name: 'Fish Fingers', price: 220 }
    ],
    mainCourse: [
      { name: 'Veg Thali', price: 140 },
      { name: 'Dal Tadka', price: 100 },
      { name: 'Paneer Butter Masala', price: 170 },
      { name: 'Butter Chicken', price: 200 },
      { name: 'Chicken Curry', price: 180 },
      { name: 'Mutton Rogan Josh', price: 250 },
      { name: 'Egg Curry', price: 130 },
      { name: 'Chapati (per piece)', price: 15 },
      { name: 'Butter Naan', price: 25 }
    ],
    biryani: [
      { name: 'Veg Biryani', price: 140 },
      { name: 'Egg Biryani', price: 150 },
      { name: 'Chicken Dum Biryani', price: 200 },
      { name: 'Mutton Biryani', price: 250 },
      { name: 'Boneless Chicken Biryani', price: 230 },
      { name: 'Special Family Chicken Biryani', price: 500 }
    ],
    chinese: [
      { name: 'Veg Noodles', price: 120 },
      { name: 'Chicken Noodles', price: 150 },
      { name: 'Veg Fried Rice', price: 130 },
      { name: 'Chicken Fried Rice', price: 160 },
      { name: 'Schezwan Fried Rice (Veg)', price: 140 },
      { name: 'Schezwan Fried Rice (Chicken)', price: 170 },
      { name: 'Chilli Chicken (Dry/Gravy)', price: 180 }
    ],
    desserts: [
      { name: 'Gulab Jamun (2 pcs)', price: 40 },
      { name: 'Ice Cream (Vanilla/Strawberry)', price: 60 },
      { name: 'Double Ka Meetha', price: 70 },
      { name: 'Qubani Ka Meetha', price: 80 }
    ],
    drinks: [
      { name: 'Mineral Water (500 ml)', price: 20 },
      { name: 'Soft Drinks (Coke/Pepsi)', price: 40 },
      { name: 'Sweet Lassi', price: 50 },
      { name: 'Masala Chaas', price: 40 },
      { name: 'Fresh Lime Soda', price: 50 },
      { name: 'Filter Coffee', price: 30 },
      { name: 'Tea', price: 20 }
    ]
  };

  const categories = [
    { key: 'starters', title: '🥗 Starters', icon: '🥗' },
    { key: 'mainCourse', title: '🍛 Main Course', icon: '🍛' },
    { key: 'biryani', title: '🍲 Biryani Specials', icon: '🍲' },
    { key: 'chinese', title: '🍜 Chinese', icon: '🍜' },
    { key: 'desserts', title: '🍨 Desserts', icon: '🍨' },
    { key: 'drinks', title: '🥤 Drinks', icon: '🥤' }
  ];

  return (
    <div className="min-h-screen py-8 bg-restaurant-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our authentic Telangana cuisine with traditional recipes and modern presentation
          </p>
        </div>

        {/* Menu Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <Card key={category.key} className="overflow-hidden shadow-lg animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-restaurant-primary to-restaurant-secondary text-white">
                <CardTitle className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{category.icon}</span>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuData[category.key as keyof typeof menuData].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-restaurant-primary">₹{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Special Notes</h3>
          <div className="text-gray-600 space-y-1">
            <p>• All prices are in Indian Rupees (₹)</p>
            <p>• Prices may vary slightly based on market conditions</p>
            <p>• Special dietary requirements can be accommodated on request</p>
            <p>• Fresh ingredients used daily for the best taste and quality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
