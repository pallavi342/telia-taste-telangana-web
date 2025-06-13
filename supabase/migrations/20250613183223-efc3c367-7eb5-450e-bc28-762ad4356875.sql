
-- Drop the existing function and recreate it with better uniqueness
DROP FUNCTION IF EXISTS generate_order_number();

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    order_num TEXT;
    counter INTEGER := 0;
BEGIN
    LOOP
        -- Generate order number with date, microseconds, and random component
        order_num := 'ORD' || TO_CHAR(NOW(), 'YYYYMMDD') || 
                     LPAD(FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000000)::TEXT, 10, '0') || 
                     LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
        
        -- Check if this order number already exists
        IF NOT EXISTS (SELECT 1 FROM orders WHERE order_number = order_num) THEN
            RETURN order_num;
        END IF;
        
        -- Safety counter to prevent infinite loop
        counter := counter + 1;
        IF counter > 100 THEN
            -- Fallback with UUID if we can't generate unique number
            order_num := 'ORD' || TO_CHAR(NOW(), 'YYYYMMDD') || 
                        REPLACE(gen_random_uuid()::TEXT, '-', '')::TEXT;
            RETURN order_num;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
