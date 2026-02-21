# Deploy from Terminal

## Quick Steps

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login

```bash
vercel login
```

### 3. Deploy

```bash
cd /home/catelle/Dream/IeltsFadi
vercel
```

Follow prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? Press enter or type name
- Directory? **./** (press enter)
- Override settings? **No**

### 4. Add Environment Variables

```bash
vercel env add MONGODB_URI
# Paste: mongodb+srv://contactafrifek_db_user:HSrwe1z7qDy5s43U@cluster0.iqaoils.mongodb.net/?appName=Cluster0
# Select: Production, Preview, Development

vercel env add SUPABASE_URL
# Paste: https://bwxqzkugzouahfbrbaog.supabase.co

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHF6a3Vnem91YWhmYnJiYW9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTU0NTU1OSwiZXhwIjoyMDg3MTIxNTU5fQ.qJTkspAwQ4y4Sc2CRntX5b8CeFEz1oHGpV-OHGinDyU

vercel env add SUPABASE_BUCKET
# Paste: church-media

vercel env add NEXTAUTH_SECRET
# Paste: XXAA2PGOLnRD5RiPaNu1gwXIO0Ve27PWiEzMdP7GP0I=

vercel env add NEXTAUTH_URL
# Paste: https://your-url.vercel.app (update after deploy)
```

### 5. Deploy to Production

```bash
vercel --prod
```

Copy the URL from output.

### 6. Update NEXTAUTH_URL

```bash
vercel env rm NEXTAUTH_URL production
vercel env add NEXTAUTH_URL
# Paste your actual URL
vercel --prod
```

## Useful Commands

```bash
vercel logs              # View logs
vercel ls                # List deployments
vercel env ls            # List env variables
vercel --prod            # Deploy to production
```

Done! Your site is live.
