import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Plus, Minus, Trash2, User, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  is_available: boolean;
}

const Order = () => {
  const { items, addItem, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('starters');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const { toast } = useToast();

  // Fetch menu items from database
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menu-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('name');
      
      if (error) throw error;
      return data as MenuItem[];
    }
  });

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

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      category: menuItem.category
    });
  };

  const filteredMenuItems = menuItems.filter(item => item.category === activeCategory);

  const handleSubmitOrder = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please provide your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingOrder(true);

    try {
      // First, create or get customer
      let customerId;
      if (customerInfo.email) {
        const { data: existingCustomer } = await supabase
          .from('customers')
          .select('id')
          .eq('email', customerInfo.email)
          .single();

        if (existingCustomer) {
          customerId = existingCustomer.id;
        }
      }

      if (!customerId) {
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            name: customerInfo.name,
            email: customerInfo.email || null,
            phone: customerInfo.phone,
            address: customerInfo.address || null
          })
          .select('id')
          .single();

        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // Create the order - let the database trigger generate order_number
      const orderData = {
        customer_id: customerId,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email || null,
        phone_number: customerInfo.phone,
        delivery_address: customerInfo.address || null,
        notes: customerInfo.notes || null,
        total_amount: getTotal(),
        status: 'pending'
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select('id, order_number')
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        item_name: item.name,
        item_category: item.category,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.order_number} has been placed. We'll contact you shortly.`,
      });

      // Clear the cart and form
      clearCart();
      setCustomerInfo({
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
      });

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error placing order",
        description: "There was an issue placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 bg-restaurant-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-restaurant-primary mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

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
              {filteredMenuItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        )}
                        <p className="text-2xl font-bold text-restaurant-primary">₹{item.price}</p>
                      </div>
                    </div>
                    
                    {getItemQuantity(item.id) === 0 ? (
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                        disabled={!item.is_available}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {item.is_available ? 'Add to Cart' : 'Not Available'}
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

          {/* Cart and Checkout Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24 mb-6">
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
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Customer Information Form */}
            {items.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Your delivery address"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any special requests or instructions"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handleSubmitOrder}
                      className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                      size="lg"
                      disabled={isSubmittingOrder}
                    >
                      {isSubmittingOrder ? 'Placing Order...' : 'Place Order'}
                    </Button>
                    <Button 
                      onClick={clearCart}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
