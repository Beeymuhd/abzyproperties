# Backend Setup Guide - Abzy Properties

This guide walks you through setting up the fully functional backend with MySQL and Vercel Blob storage.

## Phase 1: MySQL Database Setup

### Step 1: Install MySQL Locally
Download and install MySQL from https://www.mysql.com/downloads/

### Step 2: Create the Database
1. Open MySQL command line or MySQL Workbench
2. Run the initialization script:
```bash
mysql -u root -p < scripts/init.sql
```

You'll be prompted to enter your MySQL password. After running this, the database `abzy_properties` and all tables will be created with demo data.

**Demo Credentials:**
- Email: admin@abzy.com
- Password: admin123 (will need to hash this)
- Role: admin

- Email: demo@example.com  
- Password: demo123 (will need to hash this)
- Role: user

### Step 3: Hash Demo Passwords

The demo passwords in init.sql need to be hashed with bcrypt. Run this Node.js script:

```bash
node -e "
const bcrypt = require('bcryptjs');
const password = 'admin123';
bcrypt.hash(password, 10).then(hash => console.log('admin123 hash:', hash));

const password2 = 'demo123';
bcrypt.hash(password2, 10).then(hash => console.log('demo123 hash:', hash));
"
```

Copy the generated hashes and update your database:

```sql
UPDATE users SET password_hash = 'PASTE_ADMIN_HASH_HERE' WHERE email = 'admin@abzy.com';
UPDATE users SET password_hash = 'PASTE_USER_HASH_HERE' WHERE email = 'demo@example.com';
```

## Phase 2: Environment Configuration

### Step 1: Create .env.local File
Copy the template and update with your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=abzy_properties
NEXT_PUBLIC_API_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=YOUR_VERCEL_BLOB_TOKEN
NODE_ENV=development
```

### Step 2: Install Dependencies
```bash
npm install
```

## Phase 3: Vercel Blob Configuration

### Step 1: Get Blob Token
1. Go to https://vercel.com/account/tokens
2. Create a new token with Blob storage access
3. Copy the token to your `.env.local` file as `BLOB_READ_WRITE_TOKEN`

### Step 2: Test Upload
Once running, test file uploads through:
- Admin Dashboard > Properties > Upload Image
- Admin Dashboard > CEO Section > Upload Image
- Admin Dashboard > CEO Section > Upload CAC

## Phase 4: Test the Backend

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Test Authentication
Open http://localhost:3000/auth/login

Try logging in with:
- Email: admin@abzy.com
- Password: admin123

If successful, you'll be redirected to admin dashboard.

### Step 3: Test API Endpoints

Use Postman or curl to test:

**Get all properties:**
```bash
curl http://localhost:3000/api/properties
```

**Create property:**
```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Property",
    "type": "residential",
    "location": "Abuja",
    "price": 100000000,
    "bedrooms": 3,
    "bathrooms": 2,
    "area_sqft": 2500
  }'
```

**Get testimonials:**
```bash
curl http://localhost:3000/api/testimonials?status=approved
```

**Submit testimonial:**
```bash
curl -X POST http://localhost:3000/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Great service!"
  }'
```

**Upload file:**
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/image.jpg" \
  -F "type=property-image"
```

## Phase 5: Test Admin Features

1. **Properties Management:**
   - Add new property
   - Upload images
   - Mark as verified
   - Edit/delete properties

2. **Inquiries:**
   - Submit property inquiry
   - View all inquiries
   - Update inquiry status

3. **Inspections:**
   - Book inspection from property detail
   - View booking in dashboard
   - Update inspection status

4. **Testimonials:**
   - Submit testimonial
   - Approve/reject in admin panel
   - View approved testimonials on homepage

5. **CEO Section:**
   - Add CEO information
   - Upload CEO image
   - Upload CAC document
   - View on /about page

6. **Analytics:**
   - View page views trend
   - See traffic sources
   - Check conversion metrics
   - View top properties

## Phase 6: Troubleshooting

### Issue: "Cannot find module 'mysql2'"
**Solution:** Run `npm install`

### Issue: "ECONNREFUSED" on login
**Solution:** Make sure MySQL is running and credentials in `.env.local` are correct

### Issue: File upload fails
**Solution:** Check that `BLOB_READ_WRITE_TOKEN` is correctly set in `.env.local`

### Issue: "Database does not exist"
**Solution:** Run `mysql -u root -p < scripts/init.sql` again

### Issue: "Access denied for user 'root'@'localhost'"
**Solution:** Update DB_PASSWORD in `.env.local` with your MySQL password

## API Endpoints Summary

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/logout` - Logout user

### Properties
- `GET /api/properties` - List all properties with filters
- `POST /api/properties` - Create new property (admin only)
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update property (admin only)
- `DELETE /api/properties/[id]` - Delete property (admin only)

### Inquiries
- `GET /api/inquiries` - List all inquiries
- `POST /api/inquiries` - Create inquiry
- `PUT /api/inquiries` - Update inquiry status (admin only)
- `DELETE /api/inquiries` - Delete inquiry (admin only)

### Inspections
- `GET /api/inspections` - List inspections
- `POST /api/inspections` - Book inspection
- `PUT /api/inspections` - Update inspection
- `DELETE /api/inspections` - Cancel inspection

### Saved Listings
- `GET /api/saved-listings` - Get user's saved properties
- `POST /api/saved-listings` - Save property
- `DELETE /api/saved-listings` - Remove saved property

### Testimonials
- `GET /api/testimonials` - Get testimonials
- `POST /api/testimonials` - Submit testimonial
- `PUT /api/testimonials` - Update testimonial status (admin only)
- `DELETE /api/testimonials` - Delete testimonial (admin only)

### CEO Info
- `GET /api/ceo-info` - Get CEO information
- `POST /api/ceo-info` - Add CEO info (admin only)
- `PUT /api/ceo-info` - Update CEO info (admin only)
- `DELETE /api/ceo-info` - Delete CEO info (admin only)

### CAC Registration
- `GET /api/cac-registration` - Get CAC info
- `POST /api/cac-registration` - Register/update CAC
- `PUT /api/cac-registration` - Update CAC verification status (admin only)

### Analytics
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics` - Record event

### File Upload
- `POST /api/upload` - Upload file to Vercel Blob

## Next Steps: Deploy to Vercel

Once everything is working locally:

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables (same as `.env.local`)
5. Deploy

For database, you can either:
- Keep using local MySQL (requires keeping server running)
- Migrate to cloud MySQL (Planetscale, AWS RDS, etc.)

See DEPLOYMENT.md for full deployment guide.
