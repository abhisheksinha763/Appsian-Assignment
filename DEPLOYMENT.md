# Deployment Guide

## 🚀 Deploying Task Manager to Production

This guide will help you deploy:
- **Backend** → Render
- **Frontend** → Vercel

---

## 📋 Prerequisites

1. GitHub account (code should be pushed to GitHub)
2. Render account (free tier available at https://render.com)
3. Vercel account (free tier available at https://vercel.com)

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Appsian-Assignment`
3. Configure the service:

   **Settings:**
   - **Name:** `task-manager-api` (or your choice)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `Backend`
   - **Runtime:** `.NET`
   - **Build Command:** 
     ```bash
     dotnet restore && dotnet publish -c Release -o out
     ```
   - **Start Command:**
     ```bash
     cd out && dotnet Backend.dll
     ```
   - **Instance Type:** Free

### Step 3: Add Environment Variables (Optional)
- **Key:** `ASPNETCORE_ENVIRONMENT`
- **Value:** `Production`

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll get a URL like: `https://task-manager-api-xxxx.onrender.com`

### Step 5: Test Backend
Visit: `https://your-backend-url.onrender.com/swagger`

You should see the Swagger API documentation! ✅

**⚠️ Important:** Copy your backend URL - you'll need it for frontend deployment!

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `Appsian-Assignment`
3. Configure project:

   **Settings:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `Frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `build` (auto-detected)

### Step 3: Add Environment Variable
⚠️ **CRITICAL STEP:**

In the **Environment Variables** section, add:
- **Key:** `REACT_APP_API_URL`
- **Value:** `https://your-backend-url.onrender.com/api/tasks`
  
  Replace `your-backend-url.onrender.com` with your actual Render backend URL!

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Once deployed, you'll get a URL like: `https://your-app.vercel.app`

### Step 5: Test Frontend
1. Visit your Vercel URL
2. Try adding a task
3. If it works, congratulations! 🎉

---

## 🔄 Updating Your Deployment

### Update Backend (Render)
1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```
2. Render will automatically redeploy

### Update Frontend (Vercel)
1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```
2. Vercel will automatically redeploy

---

## ⚠️ Troubleshooting

### Backend Issues

**Problem:** Build fails on Render
- **Solution:** Make sure `Backend.csproj` is in the `Backend` folder
- **Solution:** Check that .NET 8 is being used

**Problem:** API returns 404
- **Solution:** Check the start command includes `cd out`
- **Solution:** Verify root directory is set to `Backend`

**Problem:** CORS errors
- **Solution:** Backend already allows all origins, should work

### Frontend Issues

**Problem:** Frontend loads but can't connect to backend
- **Solution:** Check the `REACT_APP_API_URL` environment variable in Vercel
- **Solution:** Make sure URL ends with `/api/tasks`
- **Solution:** Verify backend URL is accessible

**Problem:** 404 on page refresh
- **Solution:** `vercel.json` should handle this (already added)

**Problem:** Environment variable not working
- **Solution:** Redeploy after adding env variable
- **Solution:** Make sure key is exactly `REACT_APP_API_URL` (case-sensitive)

---

## 🎯 Quick Checklist

### Before Deploying:
- [x] Code pushed to GitHub
- [x] Backend updated with PORT configuration
- [x] Frontend using environment variable for API URL

### Backend (Render):
- [ ] Render account created
- [ ] Web service created
- [ ] Backend URL copied
- [ ] Swagger page loads

### Frontend (Vercel):
- [ ] Vercel account created
- [ ] Project imported
- [ ] `REACT_APP_API_URL` environment variable set
- [ ] App deployed and working

---

## 📱 Your Live URLs

After deployment, save these:

- **Backend API:** `https://______.onrender.com`
- **Swagger Docs:** `https://______.onrender.com/swagger`
- **Frontend App:** `https://______.vercel.app`

---

## 💡 Pro Tips

1. **Free Tier Limitations:**
   - Render free tier: Backend sleeps after 15 min of inactivity (first request will be slow)
   - Vercel free tier: Unlimited deployments, plenty for personal projects

2. **Custom Domain:**
   - Both Render and Vercel support custom domains in free tier

3. **Monitoring:**
   - Check Render logs for backend issues
   - Check Vercel logs for frontend build issues

4. **Local Development:**
   - Still use `dotnet run` for backend
   - Still use `npm start` for frontend
   - Environment variable will default to localhost

---

## 🆘 Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Check deployment logs in both platforms

Good luck with your deployment! 🚀
