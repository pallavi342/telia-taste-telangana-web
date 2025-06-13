
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      title: 'Authentic Recipes',
      description: 'Traditional recipes passed down through generations, preserving the authentic taste of Telangana',
      icon: '👨‍🍳'
    },
    {
      title: 'Fresh Ingredients',
      description: 'We source the freshest ingredients daily from local markets to ensure quality',
      icon: '🌿'
    },
    {
      title: 'Hygiene Standards',
      description: 'Strict hygiene protocols and clean cooking environment for safe dining',
      icon: '🧽'
    },
    {
      title: 'Customer Service',
      description: 'Dedicated to providing exceptional service and memorable dining experiences',
      icon: '❤️'
    }
  ];

  const team = [
    {
      name: 'Ramesh Kumar',
      role: 'Head Chef',
      description: '20+ years of experience in traditional Telangana cuisine'
    },
    {
      name: 'Lakshmi Devi',
      role: 'Kitchen Manager',
      description: 'Expert in authentic spice blends and traditional cooking methods'
    },
    {
      name: 'Suresh Reddy',
      role: 'Restaurant Manager',
      description: 'Ensuring excellent customer service and dining experience'
    }
  ];

  return (
    <div className="min-h-screen py-8 bg-restaurant-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About Telia Restaurant</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our story, values, and commitment to serving authentic Telangana cuisine
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <Card className="overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div 
                  className="h-64 md:h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop')`
                  }}
                ></div>
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    Established in 2010, Telia Restaurant began as a small family venture with a simple mission: 
                    to bring the authentic flavors of Telangana cuisine to food lovers in Hyderabad and beyond.
                  </p>
                  <p>
                    Our founders, hailing from rural Telangana, recognized that traditional recipes were slowly 
                    being forgotten in the modern world. They decided to preserve these culinary treasures by 
                    creating a restaurant that honors the heritage while embracing contemporary dining experiences.
                  </p>
                  <p>
                    Today, Telia Restaurant stands as a beacon of authentic Telangana cuisine, serving over 
                    1000 satisfied customers monthly with dishes that tell the story of our rich cultural heritage.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hygiene Practices */}
        <section className="mb-16">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-restaurant-primary to-restaurant-secondary text-white">
              <CardTitle className="text-3xl font-bold">Our Hygiene Practices</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Kitchen Standards</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Daily deep cleaning and sanitization</li>
                    <li>• Temperature-controlled storage systems</li>
                    <li>• Regular health checkups for all staff</li>
                    <li>• HACCP (Hazard Analysis Critical Control Points) compliance</li>
                    <li>• Separate preparation areas for vegetarian and non-vegetarian items</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Food Safety</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fresh ingredients sourced daily</li>
                    <li>• Proper food storage and handling procedures</li>
                    <li>• Regular quality checks and inspections</li>
                    <li>• Clean cooking oil used for all preparations</li>
                    <li>• Hygienic packaging for takeaway and delivery orders</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">
                  🏆 FSSAI Licensed & Certified | Regular Health Department Inspections | ISO 22000 Compliant
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind our delicious food</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-restaurant-primary to-restaurant-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-restaurant-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section>
          <Card className="bg-gradient-to-r from-restaurant-primary to-restaurant-secondary text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl max-w-4xl mx-auto leading-relaxed">
                "To preserve and celebrate the rich culinary heritage of Telangana by serving authentic, 
                high-quality food in a clean, welcoming environment while providing exceptional customer 
                service that makes every meal a memorable experience."
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
