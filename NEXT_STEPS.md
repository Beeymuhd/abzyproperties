# Next Steps - Get Your App Running NOW

## You're 99% Done. Follow This Exact Order:

---

## STEP 1: Install Dependencies (1 minute)

Open terminal in your project folder and run:

```bash
npm install
```

Wait for it to finish. You should see "added XX packages".

---

## STEP 2: Initialize Your Database (2 minutes)

### Make sure MySQL is RUNNING:
- Windows: Open MySQL Command Line Client
- Mac: Open Terminal
- Linux: Open Terminal

Run this command (replace `root` with your MySQL user if different):

```bash
mysql -u root -p < scripts/init.sql
```

Enter your MySQL password when prompted.

**What this does:**
- Creates database `abzy_properties`
- Creates 12 tables
- Adds demo data (3 properties, 2 users)

---

## STEP 3: Generate Password Hashes (1 minute)

In your project terminal, run:

```bash
node scripts/generate-password-hash.js
```

You'll see two hashes printed:

```
admin123 hash: $2b$10$xxxxx...
demo123 hash: $2b$10$yyyyy...
```

Copy these hashes.

---

## STEP 4: Update Database with Hashes (1 minute)

In MySQL, run:

```sql
USE abzy_properties;
UPDATE users SET password_hash = '$2b$10$xxxxx...' WHERE email = 'admin@abzy.com';
UPDATE users SET password_hash = '$2b$10$yyyyy...' WHERE email = 'demo@example.com';
```

(Paste the actual hashes you copied)

---

## STEP 5: Setup Environment Variables (2 minutes)

1. Copy the template:
```bash
cp .env.example .env.local
```

2. Open `.env.local` in VS Code

3. Fill in your values:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=abzy_properties
NEXT_PUBLIC_API_URL=http://localhost:3000
BLOB_READ_WRITE_TOKEN=skip_for_now
NODE_ENV=development
```

**Replace:**
- `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL password
- Leave BLOB token blank for now (we'll add it later)

---

## STEP 6: Start Development Server (1 minute)

In terminal:

```bash
npm run dev
```

You should see:
```
> next dev
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## STEP 7: Test It Works (2 minutes)

Open http://localhost:3000 in your browser

### Test 1: Homepage Works
- Should see Abzy Properties homepage
- See featured properties
- See testimonials

### Test 2: Login Works
- Click "Sign In" in navbar
- Go to http://localhost:3000/auth/login
- Enter:
  - Email: `admin@abzy.com`
  - Password: `admin123`
- You should see admin dashboard!

### Test 3: Admin Dashboard Works
- Click "Admin Dashboard" or go to http://localhost:3000/admin
- See properties, inquiries, analytics
- Try "Add Property" button

### Test 4: Create Property
- Click "Add New Property"
- Fill in:
  - Title: "Test Property"
  - Type: Residential
  - Location: Abuja
  - Price: 100000000
  - Bedrooms: 3
- **IMPORTANT**: Don't upload image yet (needs Blob token)
- Click Submit
- Property appears in list!

---

## STEP 8: Setup File Uploads (Optional for Now)

Want to test file uploads? Need Vercel Blob token:

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: "abzy-blob"
4. Select: "Blob Storage"
5. Click "Create"
6. Copy token
7. Paste in `.env.local` as `BLOB_READ_WRITE_TOKEN`
8. Restart server: Stop (Ctrl+C) and run `npm run dev` again
9. Now try uploading images!

---

## STEP 9: Test More Features (5 minutes)

### Saved Listings
1. Go to http://localhost:3000/properties
2. Click heart on a property
3. Go to http://localhost:3000/saved-listings
4. See saved property

### Testimonials
1. Go to http://localhost:3000/testimonials
2. Submit a testimonial
3. Admin sees in dashboard pending

### Inspections
1. Go to any property
2. Book inspection
3. See in your dashboard

### Admin Dashboard
1. Go to http://localhost:3000/admin
2. Try Properties, Inquiries, Analytics, CEO Section
3. All working!

---

## STEP 10: Before Deploying - Complete Checklist

- [ ] npm install completed
- [ ] Database initialized (init.sql run)
- [ ] Passwords hashed and updated
- [ ] .env.local created with values
- [ ] Server running (`npm run dev`)
- [ ] Homepage loads
- [ ] Login works (admin@abzy.com / admin123)
- [ ] Admin dashboard loads
- [ ] Create property works
- [ ] All navigation works
- [ ] No errors in browser console
- [ ] No errors in terminal

**If all checkmarks are done, you're ready for production!**

---

## NOW: Ready to Deploy?

### Option A: Test a Few More Days Locally
- Keep running `npm run dev`
- Customize colors, text, images
- Add more demo properties
- Invite others to test

### Option B: Deploy to Production Now
Follow **VERCEL_DEPLOYMENT.md**:

1. Push to GitHub (5 min)
2. Create production MySQL database (5 min)
3. Connect Vercel (5 min)
4. Add environment variables (2 min)
5. Deploy (2 min)

**Total: ~20 minutes to live!**

---

## Troubleshooting

### "Cannot find module 'mysql2'"
**Fix:** Run `npm install` again

### "Cannot connect to database"
**Fix:** 
- Make sure MySQL is running
- Check password in `.env.local` is correct
- Try: `mysql -u root -p` (to test connection)

### "npm ERR! code EACCES"
**Fix:** Run with sudo: `sudo npm install`

### "Port 3000 in use"
**Fix:** 
- Stop other apps using port 3000
- Or: `npm run dev -- -p 3001` (use different port)

### "File upload fails"
**Fix:** 
- Do you have BLOB_READ_WRITE_TOKEN set?
- If not, skip uploading for now
- Get token from Vercel later

---

## You're All Set! 🚀

Your fully functional real estate platform is now:

✅ **Running locally** with real database
✅ **Testing-ready** with demo data
✅ **Production-ready** to deploy anytime

**Spend 15 minutes following Steps 1-7 above, then everything works!**

Questions? Check:
- BACKEND_SETUP.md (detailed help)
- TESTING_CHECKLIST.md (what to test)
- ARCHITECTURE.md (how it works)

---

## Timeline

**Today:**
- Run setup (15 min)
- Test locally (10 min)
- You're running! ✅

**This Week:**
- Customize (colors, text, images)
- Test with team
- Fix any issues

**Next Week:**
- Deploy to Vercel (20 min)
- Go live!
- Monitor & celebrate 🎉

---

**Let's go! Start with Step 1 now.** ⏱️
