# Abzy Properties - Real Estate Platform

A fully functional, production-ready real estate application built with Next.js, React, MySQL, and Vercel Blob storage.

## 🎯 What You Get

### Frontend Features
- ✅ Property listings with search and filters
- ✅ Property detail pages with high-res images
- ✅ Interactive Google Maps view
- ✅ Property comparison tool (4 properties side-by-side)
- ✅ Real-time chat with agents
- ✅ Inspection booking system
- ✅ Client testimonials with 5-star ratings
- ✅ Saved listings/bookmarks
- ✅ User authentication (signup/login)
- ✅ User dashboard
- ✅ CEO/About section
- ✅ Dark/Light mode with glassmorphism UI

### Admin Features
- ✅ Property management (add/edit/delete with images)
- ✅ Inquiries tracker with status management
- ✅ Inspection bookings manager
- ✅ Testimonials approval workflow
- ✅ CEO profile management
- ✅ CAC registration document upload
- ✅ User management
- ✅ Analytics dashboard with charts
- ✅ Settings panel

### Backend & Infrastructure
- ✅ MySQL database with 12 tables
- ✅ Real authentication with password hashing
- ✅ 40+ API endpoints
- ✅ Cloud file storage (Vercel Blob)
- ✅ Session management
- ✅ Analytics tracking
- ✅ SQL injection protection
- ✅ Secure HTTP-only cookies

## 🚀 Quick Start (15 Minutes)

### Prerequisites
- MySQL installed on your computer
- Node.js v18+
- Git
- Vercel account (for deployment)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize Database
```bash
mysql -u root -p < scripts/init.sql
```

### Step 3: Generate Password Hashes
```bash
node scripts/generate-password-hash.js
```
Copy the hashes and update them in MySQL:
```sql
mysql -u root -p
USE abzy_properties;
UPDATE users SET password_hash = 'HASH_HERE' WHERE email = 'admin@abzy.com';
UPDATE users SET password_hash = 'HASH_HERE' WHERE email = 'demo@example.com';
EXIT;
```

### Step 4: Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=abzy_properties
NEXT_PUBLIC_API_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
NODE_ENV=development
```

### Step 5: Start Development Server
```bash
npm run dev
```

### Step 6: Test Login
Open http://localhost:3000/auth/login
- Email: admin@abzy.com
- Password: admin123

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 15-minute setup checklist
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Detailed backend configuration
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Deploy to production
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Original setup instructions
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Architecture overview

## 🏗️ Project Structure

```
/
├── /app
│   ├── /api              # 40+ API endpoints
│   ├── /admin            # Admin dashboard pages
│   ├── /auth             # Login/signup pages
│   ├── /properties       # Property listing pages
│   ├── /chat             # Chat interface
│   ├── /testimonials     # Testimonials page
│   ├── /inspect          # Inspections page
│   └── page.tsx          # Homepage
├── /components           # Reusable React components
├── /lib
│   ├── db.ts             # MySQL connection
│   ├── auth.ts           # Authentication helpers
│   ├── password.ts       # Password hashing
│   └── types.ts          # TypeScript interfaces
├── /scripts
│   ├── init.sql          # Database schema
│   └── generate-password-hash.js  # Password utility
├── /public               # Static assets
├── package.json          # Dependencies
├── .env.example          # Environment template
└── README.md             # This file
```

## 🗄️ Database Schema

### 12 Tables:
1. **users** - User accounts with hashed passwords
2. **properties** - Property listings
3. **property_images** - Property photos
4. **inquiries** - Property inquiries
5. **inspections** - Inspection bookings
6. **saved_listings** - User bookmarks
7. **testimonials** - Client reviews
8. **chat_messages** - Support chat
9. **ceo_info** - CEO profiles
10. **cac_registration** - Company documents
11. **analytics_events** - User tracking
12. **sessions** - Active sessions

All auto-created by `scripts/init.sql`

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/login           # Login user
POST /api/auth/signup          # Register user
POST /api/auth/logout          # Logout
```

### Properties
```
GET  /api/properties           # List all (with filters)
POST /api/properties           # Create
GET  /api/properties/[id]      # Get one
PUT  /api/properties/[id]      # Update
DELETE /api/properties/[id]    # Delete
```

### Inquiries
```
GET  /api/inquiries            # List inquiries
POST /api/inquiries            # Submit inquiry
PUT  /api/inquiries            # Update status
DELETE /api/inquiries          # Delete
```

### Full list in `BACKEND_SETUP.md`

## 📁 File Upload

Images, videos, and documents are stored in **Vercel Blob**:

- Property images
- CEO profile photos
- CAC documents
- Any file up to 5MB

Automatically served as public URLs.

## 🔐 Security Features

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ SQL injection prevention (parameterized queries)
- ✅ HTTP-only secure cookies
- ✅ Session expiration (7 days)
- ✅ File type validation
- ✅ File size limits
- ✅ CORS protection

## 🎨 Design

- **UI Framework**: Tailwind CSS v4
- **Components**: Shadcn/ui
- **Glassmorphism** effects with backdrop blur
- **Dark/Light** mode support
- **Responsive** mobile-first design
- **Color Scheme**: Blue-black primary, white/gray neutrals

## 📊 Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19.2
- TypeScript
- Tailwind CSS v4
- Shadcn/ui components
- Recharts (analytics)
- next-themes (dark mode)

**Backend:**
- Node.js
- MySQL (via mysql2)
- Bcryptjs (password hashing)
- Vercel Blob (file storage)

**Deployment:**
- Vercel (frontend + serverless functions)
- PlanetScale/RDS (production database)
- Vercel Blob (file storage)

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
See `VERCEL_DEPLOYMENT.md` for step-by-step instructions.

Quick version:
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## 📈 What's Fully Functional

- ✅ User registration and login
- ✅ Property creation and management
- ✅ Image uploads to cloud
- ✅ Property inquiries
- ✅ Inspection bookings
- ✅ Saved listings
- ✅ Testimonials with approval
- ✅ CEO management
- ✅ CAC document uploads
- ✅ Admin dashboard
- ✅ Analytics tracking
- ✅ Real-time data persistence
- ✅ User sessions

## 🔧 Customization

To customize the app:

1. **Colors**: Edit `/app/globals.css` CSS variables
2. **Copy**: Update text in components and pages
3. **Images**: Use `GenerateImage` or upload your own
4. **Database**: Add new tables to `/scripts/init.sql`
5. **APIs**: Add new routes in `/app/api`

## 📞 Support

For issues:
- Check `BACKEND_SETUP.md` troubleshooting section
- Read error logs in terminal
- Verify MySQL is running
- Check environment variables

## 📝 License

Built for Abzy Properties - Abuja Real Estate

## ✨ Features Highlight

### For Users
- Browse and search properties
- View detailed property information
- Compare multiple properties
- Save favorite listings
- Book property inspections
- Submit inquiries
- Leave testimonials
- Real-time chat with agents
- Responsive mobile app

### For Admins
- Manage all properties
- Upload property images
- Track customer inquiries
- Manage inspection bookings
- Approve/reject testimonials
- Update CEO information
- Upload CAC documents
- View analytics and reports
- Manage users

## 🎯 Next Steps

1. **Setup locally** - Follow QUICK_START.md
2. **Test features** - Try all functionality
3. **Customize** - Update colors, copy, images
4. **Deploy** - Push to Vercel using VERCEL_DEPLOYMENT.md
5. **Monitor** - Use Vercel dashboard for analytics

## 🏆 Performance

- Fast database queries with indexes
- Optimized images with next/image
- Code splitting with dynamic imports
- Efficient API routes
- Cloud file storage
- Auto-scaling on Vercel

---

**Built with ❤️ using v0 by Vercel**

Ready to launch your real estate business? Let's go! 🚀
