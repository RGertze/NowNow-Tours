# Now Now Tours & Safaris Database Setup Guide

This guide will help you set up the Cloudflare D1 database for your Now Now Tours & Safaris website.

## Prerequisites

1. Cloudflare account with Pages/Workers access
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Your API token: `nBUsYjmDZ73hWxgpOwEK_x_2DMZCSd4E1kB4H-PU`

## Step 1: Install Wrangler and Login

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare (use your API token when prompted)
wrangler login
```

## Step 2: Create D1 Database

```bash
# Create the D1 database
wrangler d1 create nownow-tours-db
```

This will output something like:
```
✅ Successfully created DB 'nownow-tours-db'

[[d1_databases]]
binding = "DB"
database_name = "nownow-tours-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Important**: Copy the `database_id` and update it in your `wrangler.toml` file.

## Step 3: Initialize Database Schema

```bash
# Run the schema file to create tables
wrangler d1 execute nownow-tours-db --file=./database/schema.sql
```

## Step 4: Verify Database Setup

```bash
# List all tables to verify setup
wrangler d1 execute nownow-tours-db --command="SELECT name FROM sqlite_master WHERE type='table';"

# Check if tours data was inserted
wrangler d1 execute nownow-tours-db --command="SELECT COUNT(*) as tour_count FROM tours;"
```

## Step 5: Update Cloudflare Pages Settings

1. Go to your Cloudflare Pages dashboard
2. Select your Now Now Tours & Safaris project
3. Go to Settings > Functions
4. Add the D1 database binding:
   - Variable name: `DB`
   - D1 database: `nownow-tours-db`

## Step 6: Deploy Functions

Your API endpoints are located in the `functions/api/` directory:
- `/api/tour-booking` - Handle tour booking submissions
- `/api/contact` - Handle contact form submissions
- `/api/newsletter` - Handle newsletter subscriptions
- `/api/tours` - Get tours data
- `/api/download-tracking` - Track document downloads

These will be automatically deployed with your Pages project.

## Step 7: Test API Endpoints

After deployment, you can test your endpoints:

```bash
# Test tour booking (replace YOUR_DOMAIN with your actual domain)
curl -X POST https://YOUR_DOMAIN.pages.dev/api/tour-booking \
  -H "Content-Type: application/json" \
  -d '{
    "destinations": ["zanzibar", "cape-town"],
    "startDate": "2024-06-01",
    "endDate": "2024-06-10",
    "adults": 2,
    "children": 0,
    "accommodationType": "standard",
    "budgetRange": "medium"
  }'

# Test contact form
curl -X POST https://YOUR_DOMAIN.pages.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I am interested in your tours"
  }'
```

## Database Tables Created

1. **tours** - Tour packages information
2. **tour_bookings** - Customer tour booking requests
3. **contact_messages** - Contact form submissions
4. **newsletter_subscriptions** - Email newsletter subscribers
5. **testimonials** - Customer reviews and testimonials
6. **download_tracking** - Track brochure downloads
7. **admin_users** - Admin panel users (for future use)

## Environment Variables

Make sure these are set in your Cloudflare Pages environment:
- `DB` - Your D1 database binding (set automatically)

## Troubleshooting

### Common Issues:

1. **Database not found**: Make sure the database_id in wrangler.toml matches the one created
2. **Permission denied**: Ensure your API token has D1 permissions
3. **CORS errors**: The API endpoints include CORS headers, but verify your domain is correct

### Useful Commands:

```bash
# View database schema
wrangler d1 execute nownow-tours-db --command=".schema"

# Query specific table
wrangler d1 execute nownow-tours-db --command="SELECT * FROM tours LIMIT 5;"

# Check recent bookings
wrangler d1 execute nownow-tours-db --command="SELECT * FROM tour_bookings ORDER BY created_at DESC LIMIT 10;"
```

## Next Steps

1. Set up email notifications for new bookings/contacts
2. Create an admin dashboard to manage bookings
3. Implement payment processing integration
4. Add automated email confirmations

Your database is now ready to handle all tour bookings, contact forms, and other data for your Now Now Tours & Safaris website!