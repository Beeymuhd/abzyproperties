# Deploy to Vercel - Complete Guide

Now that your backend is fully functional locally, here's how to deploy to production on Vercel.

## Prerequisites
- [ ] App working locally (tested all features)
- [ ] GitHub account
- [ ] Vercel account (free tier is fine)
- [ ] Production MySQL database (not local!)

## Step 1: Setup Production Database

### Option A: Use PlanetScale (Recommended - Easiest)

1. Go to https://planetscale.com
2. Sign up (free tier available)
3. Create new database
4. Get connection string: `mysql://user:pass@host/database`
5. Copy to notepad (you'll need it soon)

### Option B: Use AWS RDS

1. Go to AWS Console
2. Create RDS MySQL instance
3. Get connection string
4. Copy to notepad

### Option C: Keep Local MySQL (NOT Recommended)

This only works if you keep your local PC running 24/7.

## Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Full backend implementation with MySQL and Vercel Blob"

# Create GitHub repo at github.com/new
# Then add remote and push:
git remote add origin https://github.com/YOUR_USERNAME/abzy-properties.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import GitHub Repository"
3. Select your `abzy-properties` repo
4. Click "Import"

## Step 4: Add Environment Variables

On Vercel deployment page, add these variables:

```
DB_HOST=your-planetscale-host.mysql.planetscale.com
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=abzy_properties
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app
BLOB_READ_WRITE_TOKEN=vercel_blob_token_xxxxx
NODE_ENV=production
```

**To get these values:**

### DB Connection
From PlanetScale dashboard:
- Click database
- Click "Connect"
- Copy connection string
- Extract: host, user, password, database name

### Vercel Blob Token
1. In Vercel dashboard, go to "Storage"
2. Click "Create Database"
3. Select "Blob"
4. Get token
5. Copy to environment variables

## Step 5: Deploy

Click "Deploy" button on Vercel. Wait for build to complete.

If build fails:
- Check build logs
- Usually missing environment variables
- Add missing vars and redeploy

## Step 6: Test Production App

1. Go to your Vercel URL
2. Test login with admin@abzy.com / admin123
3. Try uploading a property image
4. Submit a property inquiry
5. Check admin dashboard

## Post-Deployment Checklist

- [ ] Verify MySQL connection works
- [ ] Test file uploads (check Vercel Blob)
- [ ] Login works with real credentials
- [ ] Properties persist after refresh
- [ ] Admin features work
- [ ] Email notifications (if configured)

## Common Deployment Issues

### Issue: "Cannot connect to database"
**Solution:** 
- Check DB connection string is correct
- Make sure PlanetScale/RDS is accessible
- Add Vercel's IP to database whitelist (if needed)

### Issue: "File upload fails"
**Solution:**
- Verify BLOB_READ_WRITE_TOKEN is set correctly
- Check token has Blob storage permissions
- Try uploading smaller file first

### Issue: "Build fails - cannot find module"
**Solution:**
- Run `npm install` locally first
- Make sure all dependencies are in package.json
- Check for import errors

### Issue: "Variables undefined"
**Solution:**
- Go to Vercel Project Settings
- Click Environment Variables
- Add any missing variables
- Redeploy

## Database Migration

If you want to migrate data from local to production:

1. Export local database:
```bash
mysqldump -u root -p abzy_properties > backup.sql
```

2. Import to production:
```bash
mysql -h HOST -u USER -p DATABASE < backup.sql
```

(Insert your PlanetScale credentials for HOST, USER, DATABASE)

## Continuous Deployment

Now whenever you push to GitHub:
1. Vercel automatically detects changes
2. Builds new version
3. Deploys to production
4. No manual steps needed!

To push changes:
```bash
git add .
git commit -m "Your message here"
git push origin main
```

## Custom Domain (Optional)

To use your own domain:
1. Go to Vercel Project Settings
2. Click "Domains"
3. Add your domain
4. Update DNS records (instructions provided)

## Monitoring

On Vercel dashboard you can see:
- Deployment history
- Build logs
- Performance metrics
- Error tracking
- Usage analytics

## SSL Certificate

✅ Automatic! Vercel includes free SSL for all deployments.

## Scaling

If you get more users:
- Vercel automatically scales
- PlanetScale handles database scaling
- Blob storage handles file scaling
- No changes needed on your part

## Support

For issues:
- Vercel: https://vercel.com/support
- PlanetScale: https://planetscale.com/docs

## Summary

Your app is now:
- ✅ Live on the internet
- ✅ Using real database (PlanetScale/RDS)
- ✅ Using cloud file storage (Vercel Blob)
- ✅ Auto-scaling infrastructure
- ✅ SSL certificate included
- ✅ Continuous deployment enabled

Total setup time: ~15 minutes
Monthly cost: $0 - $20 (depending on usage)

You're done! 🚀
