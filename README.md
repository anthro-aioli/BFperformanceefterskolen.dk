# Fremtiden er min - Performance 2026

**Lindenborg Efterskole Interactive Platform**

Et interaktivt univers om håb, handling og at turde kigge ud under dynen.

## Features

- 🎯 **Quiz System** - Interactive factfulness quiz with score tracking
- 💭 **Brainstorm Whiteboard** - Collaborative post-it style brainstorming
- 🎵 **Music Suggestions** - Students suggest songs for the playlist
- 💌 **Brevkasse** - Anonymous thought submission
- 🌱 **Solarpunk Gallery** - Visual inspiration with lightbox
- 📊 **Admin Dashboard** - Teacher tools for moderation and trends

## Tech Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend:** Netlify Functions (Serverless)
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Netlify
- **Domain:** performanceefterskolen.dk (NordicWay)

## Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Netlify CLI: `npm install -g netlify-cli`
- Supabase account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/fremtiden-er-min.git
   cd fremtiden-er-min
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials:
   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   - Copy the SQL from `SUPABASE_SETUP.sql`
   - Paste into Supabase SQL Editor
   - Run the query

5. **Start local development**
   ```bash
   npm run dev
   ```
   - Open `http://localhost:8888`

### Deployment to Netlify

#### Option 1: From GitHub (Recommended)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub and select this repository
5. Netlify auto-detects settings (netlify.toml)
6. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
7. Deploy!

#### Option 2: Drag-and-Drop (Simple)

1. Build locally:
   ```bash
   npm run build
   ```
2. Go to netlify.com
3. Drag-and-drop the folder to deploy
4. Add environment variables in Site Settings

### Connect Custom Domain (NordicWay)

1. In Netlify: Site Settings → Domain Management
2. Add custom domain: `performanceefterskolen.dk`
3. Go to NordicWay control panel
4. Update DNS to point to Netlify

**Netlify nameservers:**
