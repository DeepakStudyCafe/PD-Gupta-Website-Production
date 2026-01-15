# Quick Deployment Commands

This file contains quick reference commands for deploying and managing your application on Hostinger VPS.

## Initial Setup (One-time)

```bash
# 1. Connect to VPS
ssh root@your-server-ip

# 2. Navigate to application directory
cd /var/www/pd_gupta/pd_gupta

# 3. Create production environment file
cp .env.production.example .env.production
nano .env.production
# Add your Firebase credentials and save

# 4. Install dependencies
npm install

# 5. Build application
npm run build

# 6. Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Quick Deploy (Updates)

```bash
# Connect to VPS
ssh root@your-server-ip

# Navigate to app directory
cd /var/www/pd_gupta/pd_gupta

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

## Manual Deploy Steps

```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Restart
pm2 restart pd-gupta-website
```

## Troubleshooting Commands

### Fix Firebase Error
```bash
# 1. Check environment file
cat .env.production

# 2. If missing, create it
nano .env.production
# Paste your Firebase credentials

# 3. Rebuild and restart
npm run build
pm2 restart pd-gupta-website
```

### Fix "No Build Found" Error
```bash
# 1. Remove old build
rm -rf .next

# 2. Rebuild
npm run build

# 3. Restart
pm2 restart pd-gupta-website
```

### Check Application Logs
```bash
# Real-time logs
pm2 logs pd-gupta-website

# Last 50 lines
pm2 logs pd-gupta-website --lines 50

# Error logs only
tail -f logs/err.log
```

### Restart Everything
```bash
# Restart application
pm2 restart pd-gupta-website

# Restart Nginx
sudo systemctl restart nginx

# Check status
pm2 status
sudo systemctl status nginx
```

### Clean Reinstall
```bash
# Stop application
pm2 stop pd-gupta-website

# Remove build and dependencies
rm -rf .next node_modules

# Reinstall
npm install

# Rebuild
npm run build

# Start
pm2 start pd-gupta-website
```

## Environment Variables Template

Add to `.env.production`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production
```

## PM2 Commands

```bash
pm2 start ecosystem.config.js       # Start application
pm2 stop pd-gupta-website          # Stop application
pm2 restart pd-gupta-website       # Restart application
pm2 delete pd-gupta-website        # Remove from PM2
pm2 logs pd-gupta-website          # View logs
pm2 monit                          # Monitor resources
pm2 status                         # Check status
pm2 save                           # Save current processes
```

## System Health Check

```bash
# Check disk space
df -h

# Check memory
free -h

# Check running processes
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check port 3000
netstat -tlnp | grep :3000
```

## Emergency Stop

```bash
# Stop PM2 application
pm2 stop pd-gupta-website

# Or stop all PM2 processes
pm2 stop all

# Kill process on port 3000 (if needed)
lsof -ti:3000 | xargs kill -9
```

## Access Logs Location

- Application logs: `./logs/`
- PM2 logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`
