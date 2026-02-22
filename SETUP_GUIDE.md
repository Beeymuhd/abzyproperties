# Abzy Properties - Complete Setup Guide

## Step 1: Download & Setup in VS Code

### 1.1 Download the Project
1. Click the **three dots (⋯)** in the top right of the v0 preview
2. Select **"Download ZIP"**
3. Extract the ZIP file to your desired location
4. Open the extracted folder in VS Code

### 1.2 Open in VS Code
```bash
# Navigate to the project folder
cd path/to/abzy-properties

# Open in VS Code
code .
```

### 1.3 Install Dependencies
```bash
# Install all npm packages
npm install

# Or if you use yarn
yarn install
```

---

## Step 2: Connect to MySQL Database

### 2.1 Install MySQL (If Not Already Installed)

**On Windows:**
1. Download MySQL installer: https://dev.mysql.com/downloads/mysql/
2. Run the installer and follow the setup wizard
3. Remember the root password you set
4. MySQL will install typically at `localhost` on port `3306`

**On Mac:**
```bash
# Using Homebrew
brew install mysql
brew services start mysql
```

**On Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation
```

### 2.2 Create Database
Open MySQL and run:
```sql
-- Create the database
CREATE DATABASE abzy_properties;

-- Create a user (optional but recommended)
CREATE USER 'abzy_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON abzy_properties.* TO 'abzy_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2.3 Create Environment Variables File
In the root of your project, create a file named `.env.local`:

```env
# MySQL Database Connection
DATABASE_URL=mysql://abzy_user:secure_password_here@localhost:3306/abzy_properties

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Google Maps API Key (for map feature)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Admin credentials (for demo)
ADMIN_EMAIL=admin@abzy.com
ADMIN_PASSWORD=admin123
```

**⚠️ IMPORTANT:** Do NOT commit `.env.local` to GitHub. It's already in `.gitignore`.

### 2.4 Create Database Tables
Create a file `/scripts/init-db.sql` and paste the following:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(15, 2),
  location VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  land_size VARCHAR(50),
  property_type ENUM('residential', 'commercial', 'land') DEFAULT 'residential',
  verified BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(500),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Property images
CREATE TABLE IF NOT EXISTS property_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  property_id INT NOT NULL,
  image_url VARCHAR(500),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  property_id INT NOT NULL,
  user_id INT,
  message TEXT,
  contact_method VARCHAR(50),
  status ENUM('new', 'contacted', 'scheduled', 'completed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inspections
CREATE TABLE IF NOT EXISTS inspections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  preferred_date DATE,
  time_slot VARCHAR(50),
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Saved listings
CREATE TABLE IF NOT EXISTS saved_listings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  property_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id),
  UNIQUE KEY unique_save (user_id, property_id)
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  message TEXT,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CEO information
CREATE TABLE IF NOT EXISTS ceo_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ceo_name VARCHAR(255),
  position VARCHAR(255),
  bio TEXT,
  cac_number VARCHAR(255),
  cac_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_type VARCHAR(100),
  user_id INT,
  property_id INT,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Insert default admin user
INSERT IGNORE INTO users (email, password_hash, name, role)
VALUES ('admin@abzy.com', 'hashed_password_here', 'Admin User', 'admin');

-- Insert sample properties
INSERT INTO properties (title, description, price, location, property_type, verified, image_url) VALUES
('Luxury Apartment in Maitama', 'Modern 4-bedroom apartment with pool', 75000000, 'Maitama, Abuja', 'residential', true, 'https://images.unsplash.com/photo-1545324418-cc1a9db00dae?w=500'),
('Commercial Space - Garki', 'Prime office space in business district', 150000000, 'Garki, Abuja', 'commercial', true, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500'),
('Land Plot - Kubwa', 'Residential land plot, 2000 sqm', 8000000, 'Kubwa, Abuja', 'land', true, 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500');
```

Run this SQL file:
```bash
# In MySQL terminal
mysql -u abzy_user -p abzy_properties < scripts/init-db.sql
# Enter password: secure_password_here
```

---

## Step 3: Run Development Server

### 3.1 Start the Application
```bash
npm run dev
```

You should see:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 3.2 Access the Application
- Open browser: **http://localhost:3000**
- Try logging in with demo credentials:
  - Email: `admin@abzy.com`
  - Password: `admin123`

### 3.3 Verify Database Connection
If the app loads without errors, your MySQL connection is working!

---

## Step 4: Test Features Locally

### 4.1 Test User Features
- Browse properties on homepage
- Click on a property to view details
- Try the search and filter functionality
- Save properties (if logged in)
- Visit the map view
- Try property comparison

### 4.2 Test Admin Features
1. Login as admin
2. Go to http://localhost:3000/admin
3. Try:
   - View dashboard
   - Add a new property
   - View inquiries
   - Check analytics
   - Manage users

### 4.3 Check Console for Errors
- Press `F12` in browser
- Check the Console tab
- Watch the terminal for backend errors

---

## Step 5: Deploy to Vercel

### 5.1 Push to GitHub
```bash
# Initialize git if not done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Abzy Properties real estate platform"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/abzy-properties.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5.2 Connect to Vercel
1. Go to https://vercel.com
2. Sign up or login
3. Click **"Add New"** → **"Project"**
4. Select your GitHub repository
5. Click **"Import"**

### 5.3 Add Environment Variables in Vercel
1. In Vercel, go to **Settings** → **Environment Variables**
2. Add these variables:

```
DATABASE_URL = mysql://your_user:password@your_host:3306/abzy_properties
NEXT_PUBLIC_API_URL = https://your-vercel-domain.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = your_api_key
```

### 5.4 Deploy
1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app is now live!

### 5.5 Set Custom Domain (Optional)
1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions

---

## Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Check `.env.local` file is in the root directory
- Verify MySQL is running: `mysql -u root -p`
- Check database name is correct: `SHOW DATABASES;`
- Restart the dev server: Stop it and run `npm run dev` again

### Issue: "Port 3000 is already in use"
**Solution:**
```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: "Module not found" errors
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Vercel deployment fails
**Solutions:**
1. Check build logs in Vercel dashboard
2. Make sure `.env.local` is NOT committed to GitHub
3. Add all environment variables to Vercel settings
4. Check for TypeScript errors: `npm run build`

---

## Next Steps After Deployment

1. **Setup Proper Database**: Use managed MySQL (PlanetScale, AWS RDS, or similar)
2. **Add Google Maps API Key**: Get from Google Cloud Console
3. **Setup Email Service**: For password resets and notifications
4. **Enable HTTPS**: Automatic on Vercel
5. **Setup Monitoring**: Use Sentry or Vercel Analytics
6. **Add Rate Limiting**: Protect API routes from abuse
7. **Implement Proper Auth**: Add password hashing with bcrypt
8. **Setup Image CDN**: Use Vercel Blob or Cloudinary

---

## Demo Accounts

```
Admin Account:
Email: admin@abzy.com
Password: admin123

Test User:
Email: demo@example.com
Password: demo123
```

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **MySQL Docs**: https://dev.mysql.com/doc/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Good luck with your deployment! 🚀**
