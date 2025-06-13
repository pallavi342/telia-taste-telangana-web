
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const features = [
    {
      title: 'Authentic Flavors',
      description: 'Traditional Telangana recipes passed down through generations',
      icon: '🌶️'
    },
    {
      title: 'Fresh Ingredients',
      description: 'Locally sourced, fresh ingredients prepared daily',
      icon: '🥗'
    },
    {
      title: 'Quick Service',
      description: 'Fast and efficient service without compromising quality',
      icon: '⚡'
    },
    {
      title: 'Home Delivery',
      description: 'Hot and fresh food delivered to your doorstep',
      icon: '🚚'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-restaurant-primary to-restaurant-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1200&h=800&fit=crop')`
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-restaurant-accent">Telia Restaurant</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience the authentic taste of Telangana cuisine with our traditional recipes and modern hospitality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-restaurant-accent hover:bg-restaurant-accent/90 text-gray-900">
              <Link to="/menu">View Menu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/order">Order Online</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-restaurant-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Telia Restaurant?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We bring you the finest dining experience with authentic Telangana flavors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Signature Dishes</h2>
            <p className="text-xl text-gray-600">Taste the best of Telangana cuisine</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-restaurant-primary to-restaurant-secondary"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Chicken Dum Biryani</h3>
                <p className="text-gray-600 mb-4">Aromatic basmati rice cooked with tender chicken and traditional spices</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-restaurant-primary">₹200</span>
                  <Button asChild size="sm">
                    <Link to="/order">Order Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-restaurant-secondary to-restaurant-accent"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Mutton Rogan Josh</h3>
                <p className="text-gray-600 mb-4">Slow-cooked mutton in rich aromatic gravy with traditional spices</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-restaurant-primary">₹250</span>
                  <Button asChild size="sm">
                    <Link to="/order">Order Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-restaurant-accent to-restaurant-primary"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Paneer Butter Masala</h3>
                <p className="text-gray-600 mb-4">Creamy tomato-based curry with soft paneer cubes and aromatic spices</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-restaurant-primary">₹170</span>
                  <Button asChild size="sm">
                    <Link to="/order">Order Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your favorite dishes delivered hot and fresh to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-restaurant-primary hover:bg-restaurant-primary/90">
              <Link to="/order">Order Online</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
