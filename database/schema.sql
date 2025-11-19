-- Now Now Tours & Safaris Database Schema
    name TEXT NOT NULL,
    destination TEXT NOT NULL,
    description TEXT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    duration_days INTEGER NOT NULL,
    max_capacity INTEGER NOT NULL,
    images TEXT, -- JSON array of image URLs
    itinerary TEXT, -- JSON array of itinerary items
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tour bookings table - stores customer tour requests
CREATE TABLE IF NOT EXISTS tour_bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_reference TEXT UNIQUE NOT NULL,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    selected_destinations TEXT NOT NULL, -- JSON array of destination IDs
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    adults INTEGER NOT NULL DEFAULT 1,
    children INTEGER NOT NULL DEFAULT 0,
    accommodation_type TEXT NOT NULL, -- budget, standard, luxury, premium
    budget_range TEXT NOT NULL, -- low, medium, high
    transport_preference TEXT, -- flight, road, mixed
    dietary_restrictions TEXT,
    accessibility_needs TEXT,
    custom_activities TEXT,
    special_requests TEXT,
    estimated_price DECIMAL(10,2),
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table - stores contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new', -- new, read, replied
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active', -- active, unsubscribed
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at DATETIME
);

-- Testimonials table - stores customer reviews
CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    tour_id INTEGER,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    customer_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES tours (id)
);

-- Download tracking table - tracks brochure downloads
CREATE TABLE IF NOT EXISTS download_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_name TEXT NOT NULL,
    user_email TEXT,
    user_ip TEXT,
    user_agent TEXT,
    downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table - for backend management
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin', -- admin, manager
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Custom document requests table
CREATE TABLE IF NOT EXISTS custom_document_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id TEXT UNIQUE NOT NULL,
    document_type TEXT NOT NULL, -- detailed-itinerary, travel-guide, budget-breakdown, etc.
    destination TEXT,
    travel_dates TEXT,
    group_size TEXT,
    specific_requests TEXT,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    status TEXT DEFAULT 'pending', -- pending, in-progress, completed, sent
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
);

-- Insert initial tour data
INSERT OR REPLACE INTO tours (id, name, destination, description, base_price, duration_days, max_capacity, images, itinerary) VALUES
(1, 'Zanzibar Getaway', 'Tanzania', 'Relax on the pristine white-sand beaches of the Spice Islands. Explore historic Stone Town and swim with turtles.', 21800.00, 5, 20, 
 '["https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 '["Return ticket from Windhoek to Zanzibar", "Boat Trip", "Dolphin Snorkel"]'),

(2, 'Cape Town Adventure', 'South Africa', 'Experience the vibrant culture and breathtaking landscapes of the Mother City, from Table Mountain to the Cape Winelands.', 6800.00, 6, 15,
 '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 '["Table Mountain", "Daily Breakfast & Dinner", "Wine Tasting", "Soufriere Boat Cruise"]'),

(3, 'Lubango Wonders', 'Angola', 'Discover the raw, untouched beauty of Angola. From the bustling capital Luanda to the stunning Kalandula Falls.', 5200.00, 7, 12,
 '["https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 '["Cristo Rei Miradouro", "Pulukua Resort", "Beach Hopping"]'),

(4, 'Victoria Falls', 'Zambia', 'Experience the awe-inspiring Victoria Falls and the nearby Livingstone attractions for a memorable, water-themed escape.', 7500.00, 3, 25,
 '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 '["Day Visit to Victoria Falls", "Livingstone Waterfront", "Sunset Cruise (Optional)"]');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tour_bookings_email ON tour_bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_status ON tour_bookings(status);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_created ON tour_bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);