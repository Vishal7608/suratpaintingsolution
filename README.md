# 🎨 Surat Painting Solution - Full Stack Web Application

A production-ready React + Node.js (Express) web application for Surat Painting Solution (House Painting & Waterproofing Services in Surat, Gujarat).

---

## 🛠️ GitHub Push & Deployment Guide

Follow these steps to initialize Git, push to GitHub, and deploy on **Vercel** or **Render**.

### Step 1: Initialize Git and Push to GitHub

Run the following commands in your local project terminal:

```bash
# 1. Initialize git repository
git init

# 2. Add all files to git tracking
git add .

# 3. Create your initial commit
git commit -m "Initial commit - Surat Painting Solution Full-Stack App"

# 4. Rename default branch to main
git branch -M main

# 5. Add your GitHub repository URL (Replace with your actual repo link)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/surat-painting-solution.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 🚀 Deployment Options

### Option A: Deploying on Vercel (Recommended for Frontend + Vercel Serverless)

1. Connect your GitHub repository on [Vercel](https://vercel.com).
2. Set the Framework Preset to **Vite**.
3. Set the Root Directory to `./`.
4. Add the required Environment Variables in Vercel Project Settings:
   - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini Key)*
   - `JWT_SECRET`: *(Any secure random string for admin login tokens)*
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: *(Your secure admin password)*
   - `MONGODB_URI`: *(Optional: MongoDB connection string for persistent lead database)*
5. Click **Deploy**. The included `vercel.json` and `api/index.ts` automatically configure client-side SPA routing and Express API endpoints.

---

### Option B: Deploying on Render (Recommended for 24/7 Background Schedulers & Long Connections)

1. Create a **New Web Service** on [Render](https://render.com) and connect your GitHub repository.
2. Configure settings:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
3. Add Environment Variables:
   - `PORT`: `3000`
   - `GEMINI_API_KEY`: *(Your Gemini API Key)*
   - `JWT_SECRET`: *(Your JWT Secret Key)*
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: *(Your Admin Password)*
4. Click **Create Web Service**.

---

## 📋 Verified Project Structure Checklist

The project has been pre-configured with zero missing files:

- ✅ `vercel.json` - Configured for Vercel SPA routing and serverless function forwarding.
- ✅ `api/index.ts` - Vercel serverless entry point exporting Express `app`.
- ✅ `.gitignore` - Excludes `node_modules`, `dist/`, `.env*` while preserving `.env.example`.
- ✅ `.env.example` - Full environment variable template for deployment platforms.
- ✅ `server.ts` & `/server/` - Fully exports Express backend API routes and 24/7 background lead alert scheduler.
- ✅ `src/` - React frontend with clean case-sensitive imports (`AdminDashboard.jsx`, `LeadForm.jsx`, etc.).
- ✅ `public/` - Contains all SEO assets (`logo.png`, `sitemap.xml`, `robots.txt`).

---

## 🔑 Environment Variables Reference (`.env.example`)

```env
GEMINI_API_KEY=
APP_URL=https://suratpaintingsolution.onrender.com
PORT=3000
MONGODB_URI=
JWT_SECRET=
ADMIN_USERNAME=admin
ADMIN_PASSWORD=
```
