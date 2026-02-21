# Setup Instructions

## Supabase Storage Bucket Setup

To fix the "Bucket not found" error when uploading images:

1. Go to your Supabase dashboard: https://bwxqzkugzouahfbrbaog.supabase.co
2. Navigate to Storage section
3. Create a new bucket named: `church-media`
4. Set the bucket to **Public** (so images can be accessed without authentication)
5. Configure bucket policies:
   - Allow public read access
   - Allow authenticated uploads (admin only)

### Bucket Policy Example:
```sql
-- Allow public to read files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'church-media' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'church-media' AND auth.role() = 'authenticated' );
```

## Keep-Alive Setup (Prevent MongoDB/Supabase Pausing)

Both MongoDB Atlas and Supabase free tier pause after inactivity. Use one of these methods:

### Method 1: External Cron Service (Recommended)
Use a free service like:
- **cron-job.org** - https://cron-job.org
- **UptimeRobot** - https://uptimerobot.com
- **Easycron** - https://www.easycron.com

Setup:
1. Create account on any service above
2. Add a new monitor/job
3. URL: `https://your-domain.com/api/health`
4. Interval: Every 5 minutes
5. Method: GET

### Method 2: Local Cron Job
If you have a server running 24/7:

```bash
# Edit crontab
crontab -e

# Add this line (runs every 5 minutes)
*/5 * * * * curl -s https://your-domain.com/api/health > /dev/null 2>&1
```

### Method 3: Node.js Keep-Alive Script
Run the included script:

```bash
npm run keep-alive
```

Or use PM2 to run it as a background service:

```bash
npm install -g pm2
pm2 start scripts/keep-alive.js --name "church-keepalive"
pm2 save
pm2 startup
```

## Changes Made

### 1. Merged Q&A Pages
- Combined `/ask` and `/questions` into single `/questions` page
- Removed "Question anonyme" from navigation menu
- Updated home page link to point to merged page
- Users can now ask questions and view answers on the same page

### 2. Theme du Mois Admin Management
- Created `/admin/theme` page for managing monthly theme
- Admin can update:
  - Theme text (French and English)
  - Theme image
- Home page now displays dynamic theme from database
- Added theme API endpoint at `/api/theme`

### 3. Fixed Supabase Configuration
- Added `SUPABASE_BUCKET=church-media` to `.env` file
- This fixes the environment variable issue
- **Still need to create the bucket in Supabase dashboard** (see instructions above)

### 4. Media Library Selection
- Image upload fields now have "Choose from Library" button
- Shows all previously uploaded images in a grid
- Click any image to select it
- Reduces duplicate uploads
- Works in all admin forms (Events, Ministries, Stories, Updates, Theme)

### 5. Keep-Alive System
- Created `/api/health` endpoint that pings MongoDB and Supabase
- Created `scripts/keep-alive.js` for automated pinging
- Added cron job examples
- Prevents free tier services from pausing due to inactivity

## Testing

After creating the Supabase bucket:
1. Login to admin panel
2. Go to Events or Ministries
3. Try uploading an image
4. Image should upload successfully and display in the form
5. Click "Choose from Library" to see uploaded images
6. Go to Theme du mois admin page
7. Upload a theme image and update text
8. Check home page to see the updated theme
9. Visit `/api/health` to verify MongoDB and Supabase connectivity
