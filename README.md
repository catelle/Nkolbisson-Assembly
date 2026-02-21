# CMFI Nkolbisson Assembly Website

A bilingual (French/English) church management system built with Next.js for CMFI Nkolbisson Assembly in Yaounde, Cameroon.

## Features

### Public Features
- 🏠 **Home Page** - Hero section with monthly theme, upcoming events, news, ministries, and Q&A
- 📅 **Events** - Searchable calendar with ministry filtering
- 🙏 **Ministries** - Overview of church ministries and leaders
- 📖 **Bible Stories** - Curated biblical stories with rich content blocks
- 📰 **News** - Community updates and testimonies
- ❓ **Q&A** - Anonymous question submission with public answers
- 🌐 **Bilingual** - Full French and English support

### Admin Features
- 🔐 **Secure Authentication** - NextAuth with role-based access
- 📝 **Content Management** - CRUD operations for events, ministries, stories, news
- 💬 **Question Management** - Review, answer, and publish anonymous questions
- 🎨 **Theme Management** - Update monthly theme text and image
- 📸 **Media Library** - Upload images to Supabase with library selection
- 👥 **User Management** - Manage admin users

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB Atlas
- **Storage**: Supabase Storage
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd IeltsFadi
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI="your-mongodb-connection-string"
SUPABASE_URL="your-supabase-url"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
SUPABASE_BUCKET="church-media"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up Supabase Storage:
   - Go to Supabase Dashboard → Storage
   - Create a public bucket named `church-media`
   - Configure policies for public read and authenticated upload

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Default Admin Access

Create an admin user in MongoDB `users` collection:
```json
{
  "username": "admin",
  "password": "<bcrypt-hashed-password>",
  "role": "admin"
}
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── (public)/          # Public pages
│   │   ├── admin/             # Admin dashboard
│   │   └── account/           # User account pages
│   └── api/                   # API routes
├── components/
│   ├── admin/                 # Admin components
│   └── site/                  # Public components
├── lib/
│   ├── auth-helpers.ts        # Authentication utilities
│   ├── content.ts             # Content fetching
│   ├── copy.ts                # Translations
│   ├── locale.ts              # Locale utilities
│   ├── mongo.ts               # MongoDB connection
│   ├── site.ts                # Site configuration
│   ├── supabase.ts            # Supabase client
│   ├── theme.ts               # Theme management
│   └── types.ts               # TypeScript types
└── scripts/
    ├── keep-alive.js          # Keep services active
    └── crontab.example        # Cron job examples
```

## Keep-Alive System

To prevent MongoDB Atlas and Supabase from pausing on free tier:

### Option 1: External Monitoring (Recommended)
Use a free service like [cron-job.org](https://cron-job.org) or [UptimeRobot](https://uptimerobot.com):
- URL: `https://your-domain.com/api/health`
- Interval: Every 5 minutes

### Option 2: Local Script
```bash
npm run keep-alive
```

### Option 3: Cron Job
```bash
*/5 * * * * curl -s https://your-domain.com/api/health > /dev/null 2>&1
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
MONGODB_URI=<production-mongodb-uri>
SUPABASE_URL=<production-supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<production-key>
SUPABASE_BUCKET=church-media
NEXTAUTH_SECRET=<generate-new-secret>
NEXTAUTH_URL=https://your-domain.com
```

## Key Features Implementation

### Bilingual Content
All content is stored with French and English versions:
```typescript
{
  title: { fr: "Titre", en: "Title" },
  description: { fr: "Description", en: "Description" }
}
```

### Media Library
- Upload images up to 1MB
- Select from previously uploaded images
- Automatic image optimization
- Public CDN delivery via Supabase

### Anonymous Questions
- Users can submit questions anonymously
- Admins review and answer in private chat
- Publish selected answers for community benefit

### Monthly Theme
- Admin updates theme text and image
- Displayed prominently on home page
- Supports both languages

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run keep-alive` - Run keep-alive script

## Documentation

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed setup guide.

## License

Private project for CMFI Nkolbisson Assembly.
