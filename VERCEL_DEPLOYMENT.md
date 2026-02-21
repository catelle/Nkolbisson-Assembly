# Vercel Deployment Guide

## Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas database
4. Supabase project with `church-media` bucket created

## Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

## Step 3: Configure Environment Variables

In Vercel project settings, add these environment variables:

```env
MONGODB_URI=mongodb+srv://contactafrifek_db_user:HSrwe1z7qDy5s43U@cluster0.iqaoils.mongodb.net/?appName=Cluster0

SUPABASE_URL=https://bwxqzkugzouahfbrbaog.supabase.co

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHF6a3Vnem91YWhmYnJiYW9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTU0NTU1OSwiZXhwIjoyMDg3MTIxNTU5fQ.qJTkspAwQ4y4Sc2CRntX5b8CeFEz1oHGpV-OHGinDyU

SUPABASE_BUCKET=church-media

NEXTAUTH_SECRET=XXAA2PGOLnRD5RiPaNu1gwXIO0Ve27PWiEzMdP7GP0I=

NEXTAUTH_URL=https://your-project-name.vercel.app
```

**Important:** Update `NEXTAUTH_URL` with your actual Vercel deployment URL after first deploy.

## Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Once deployed, copy your deployment URL
4. Go back to Environment Variables
5. Update `NEXTAUTH_URL` with your actual URL
6. Redeploy

## Step 5: Set Up Keep-Alive

Use a free monitoring service to prevent MongoDB/Supabase from pausing:

### Option 1: UptimeRobot (Recommended)
1. Sign up at https://uptimerobot.com
2. Add new monitor:
   - Monitor Type: HTTP(s)
   - URL: `https://your-project-name.vercel.app/api/health`
   - Monitoring Interval: 5 minutes
3. Save

### Option 2: Cron-job.org
1. Sign up at https://cron-job.org
2. Create new cron job:
   - URL: `https://your-project-name.vercel.app/api/health`
   - Schedule: Every 5 minutes
3. Save

## Step 6: Verify Deployment

1. Visit your site: `https://your-project-name.vercel.app`
2. Test login at: `https://your-project-name.vercel.app/fr/admin/login`
3. Check health endpoint: `https://your-project-name.vercel.app/api/health`

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Run `npm run build` locally to test

### Environment Variables Not Working
- Make sure there are no quotes around values in Vercel
- Redeploy after adding/changing variables

### Images Not Loading
- Verify Supabase bucket exists and is public
- Check Next.js config has correct domain

### MongoDB Connection Issues
- Whitelist Vercel IPs in MongoDB Atlas (or use 0.0.0.0/0)
- Verify connection string is correct

### Authentication Issues
- Ensure NEXTAUTH_URL matches your deployment URL
- NEXTAUTH_SECRET must be set

## Custom Domain (Optional)

1. Go to Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update NEXTAUTH_URL to your custom domain
5. Redeploy

## Continuous Deployment

Once set up, every push to your main branch will automatically deploy to Vercel.

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys
```

## Production Checklist

- [ ] All environment variables set
- [ ] NEXTAUTH_URL updated with production URL
- [ ] MongoDB Atlas allows Vercel connections
- [ ] Supabase bucket created and public
- [ ] Keep-alive monitoring configured
- [ ] Admin user created in MongoDB
- [ ] Test all features on production
- [ ] Custom domain configured (optional)
