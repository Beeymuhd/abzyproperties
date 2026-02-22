# Quick Start - Abzy Properties Backend Setup

Follow this checklist to get your fully functional app running in 15 minutes.

## ✅ Pre-Setup Checklist
- [ ] MySQL installed on your computer
- [ ] Node.js installed (v18+)
- [ ] Vercel account created
- [ ] Project downloaded and open in VS Code

## ✅ Step 1: Install Dependencies (2 min)
```bash
npm install
```

## ✅ Step 2: Initialize Database (3 min)

### On Windows (Command Prompt):
```bash
mysql -u root -p < scripts/init.sql
```
Then enter your MySQL password when prompted.

### On Mac/Linux (Terminal):
```bash
mysql -u root -p < scripts/init.sql
```

**If you forgot your MySQL password:**
1. Open MySQL command line directly
2. Type: `mysql -u root`
3. Exit with `\q`

## ✅ Step 3: Generate Password Hashes (1 min)
```bash
node scripts/generate-password-hash.js
```

Copy the hash for admin@abzy.com and paste this into MySQL:
```sql
mysql -u root -p
USE abzy_properties;
UPDATE users SET password_hash = 'PASTE_HASH_HERE' WHERE email = 'admin@abzy.com';
UPDATE users SET password_hash = 'PASTE_HASH_HERE' WHERE email = 'demo@example.com';
EXIT;
```

## ✅ Step 4: Setup Environment Variables (2 min)

1. Copy the template:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and fill in your details:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=abzy_properties
NEXT_PUBLIC_API_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=YOUR_VERCEL_BLOB_TOKEN (get from Vercel)
NODE_ENV=development
```

## ✅ Step 5: Get Vercel Blob Token (2 min)
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Give it any name (e.g., "abzy-blob")
4. Select "Blob Storage" scope
5. Copy the token and paste in `.env.local`

## ✅ Step 6: Start Development Server (1 min)
```bash
npm run dev
```

Open http://localhost:3000 in your browser

## ✅ Step 7: Test Login (1 min)
Go to http://localhost:3000/auth/login

Try these credentials:
- Email: `admin@abzy.com`
- Password: `admin123`

If you see the admin dashboard, you're good to go! 🎉

## ✅ Step 8: Test Key Features (3 min)

### Properties Management
- Go to Admin > Properties
- Click "Add New Property"
- Upload an image
- Submit

### File Uploads
- Upload should work instantly (stored in Vercel Blob)
- Go to Admin > CEO Section
- Upload a CEO image and CAC document
- Check that files appear

### Testimonials
- Go to http://localhost:3000/testimonials
- Submit a testimonial
- Go to Admin > Dashboard
- View in pending testimonials section

### Inspections
- Go to any property detail
- Click "Book Inspection"
- Go to Dashboard > Inspections
- See your booking

## Common Issues

### "Cannot connect to database"
**Fix:** Update DB_PASSWORD in `.env.local` to match your MySQL password

### "Access denied for user"
**Fix:** Check your MySQL username/password in `.env.local`

### "File upload fails"
**Fix:** Make sure BLOB_READ_WRITE_TOKEN is set correctly

### "Module not found: mysql2"
**Fix:** Run `npm install` again

## Next: Deploy to Vercel

Once everything works locally:

1. Push to GitHub: `git push`
2. Go to https://vercel.com/new
3. Import your repo
4. Add same env variables from `.env.local`
5. Deploy!

For detailed deployment instructions, see `DEPLOYMENT.md` and `BACKEND_SETUP.md`.

## Database Tables Overview

All these are now fully functional:

- **users** - Admin and regular user accounts
- **properties** - All property listings
- **inquiries** - User inquiries on properties
- **inspections** - Booked property viewings
- **saved_listings** - User's bookmarked properties
- **testimonials** - Client reviews (pending/approved)
- **ceo_info** - CEO profiles
- **cac_registration** - Company CAC document
- **chat_messages** - Support chat messages
- **analytics_events** - User activity tracking
- **sessions** - Active user sessions

Everything persists to the database now. No more mock data!

Happy building! 🚀
