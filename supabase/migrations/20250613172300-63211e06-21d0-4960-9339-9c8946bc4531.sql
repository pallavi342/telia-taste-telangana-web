
-- Create customers table for storing customer information
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table for storing order information
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) NOT NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  delivery_address TEXT,
  phone_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table for storing individual items in each order
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  item_name TEXT NOT NULL,
  item_category TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_items table for managing restaurant menu
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_menu_items_category ON public.menu_items(category);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (since this is a restaurant ordering system)
-- Customers can view their own data
CREATE POLICY "Customers can view their own data" ON public.customers
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert customer data" ON public.customers
  FOR INSERT WITH CHECK (true);

-- Orders policies - allow public access for placing orders
CREATE POLICY "Anyone can view orders" ON public.orders
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update orders" ON public.orders
  FOR UPDATE USING (true);

-- Order items policies
CREATE POLICY "Anyone can view order items" ON public.order_items
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert order items" ON public.order_items
  FOR INSERT WITH CHECK (true);

-- Menu items policies
CREATE POLICY "Anyone can view menu items" ON public.menu_items
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert menu items" ON public.menu_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update menu items" ON public.menu_items
  FOR UPDATE USING (true);

-- Insert sample menu items based on your current menu
INSERT INTO public.menu_items (name, category, price, description) VALUES
-- Starters
('Veg Manchurian Dry', 'starters', 120, 'Crispy vegetable balls in dry manchurian sauce'),
('Gobi 65', 'starters', 130, 'Spicy cauliflower fritters'),
('Paneer Tikka', 'starters', 160, 'Grilled cottage cheese cubes with spices'),
('Chicken 65', 'starters', 180, 'Spicy fried chicken appetizer'),
('Chicken Lollipop (6 pcs)', 'starters', 200, 'Chicken drumettes in spicy coating'),
('Fish Fingers', 'starters', 220, 'Crispy fish strips'),

-- Main Course
('Veg Thali', 'mainCourse', 140, 'Complete vegetarian meal with rice, dal, vegetables'),
('Dal Tadka', 'mainCourse', 100, 'Tempered yellow lentils'),
('Paneer Butter Masala', 'mainCourse', 170, 'Cottage cheese in rich tomato gravy'),
('Butter Chicken', 'mainCourse', 200, 'Chicken in creamy tomato sauce'),
('Chicken Curry', 'mainCourse', 180, 'Traditional chicken curry'),
('Mutton Rogan Josh', 'mainCourse', 250, 'Spicy mutton curry'),
('Egg Curry', 'mainCourse', 130, 'Boiled eggs in curry sauce'),
('Chapati (per piece)', 'mainCourse', 15, 'Indian flatbread'),
('Butter Naan', 'mainCourse', 25, 'Buttered Indian bread'),

-- Biryani
('Veg Biryani', 'biryani', 140, 'Aromatic rice with mixed vegetables'),
('Egg Biryani', 'biryani', 150, 'Biryani with boiled eggs'),
('Chicken Dum Biryani', 'biryani', 200, 'Traditional chicken biryani'),
('Mutton Biryani', 'biryani', 250, 'Rich mutton biryani'),
('Boneless Chicken Biryani', 'biryani', 230, 'Biryani with boneless chicken'),
('Special Family Chicken Biryani', 'biryani', 500, 'Large portion family biryani'),

-- Chinese
('Veg Noodles', 'chinese', 120, 'Stir-fried noodles with vegetables'),
('Chicken Noodles', 'chinese', 150, 'Noodles with chicken'),
('Veg Fried Rice', 'chinese', 130, 'Fried rice with mixed vegetables'),
('Chicken Fried Rice', 'chinese', 160, 'Fried rice with chicken'),
('Schezwan Fried Rice (Veg)', 'chinese', 140, 'Spicy vegetable fried rice'),
('Schezwan Fried Rice (Chicken)', 'chinese', 170, 'Spicy chicken fried rice'),
('Chilli Chicken (Dry/Gravy)', 'chinese', 180, 'Spicy chicken preparation'),

-- Desserts
('Gulab Jamun (2 pcs)', 'desserts', 40, 'Sweet milk dumplings'),
('Ice Cream (Vanilla/Strawberry)', 'desserts', 60, 'Cold dessert'),
('Double Ka Meetha', 'desserts', 70, 'Bread pudding dessert'),
('Qubani Ka Meetha', 'desserts', 80, 'Apricot dessert'),

-- Drinks
('Mineral Water (500 ml)', 'drinks', 20, 'Bottled water'),
('Soft Drinks (Coke/Pepsi)', 'drinks', 40, 'Carbonated beverages'),
('Sweet Lassi', 'drinks', 50, 'Sweet yogurt drink'),
('Masala Chaas', 'drinks', 40, 'Spiced buttermilk'),
('Fresh Lime Soda', 'drinks', 50, 'Fresh lime with soda'),
('Filter Coffee', 'drinks', 30, 'South Indian coffee'),
('Tea', 'drinks', 20, 'Hot tea');

-- Create a function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ORD' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(EXTRACT(EPOCH FROM NOW())::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Create a trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
