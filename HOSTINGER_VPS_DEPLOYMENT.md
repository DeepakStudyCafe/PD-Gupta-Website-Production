# Hostinger VPS Deployment Guide

This guide will help you deploy your Next.js application on Hostinger VPS.

## Prerequisites

- SSH access to your Hostinger VPS
- Node.js 18+ installed on the server
- PM2 for process management (recommended)
- Your Firebase credentials ready

---

## Step 1: Connect to Your VPS

```bash
ssh root@your-server-ip
```

---

## Step 2: Install Required Software

### Install Node.js (if not already installed)
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install PM2 (Process Manager)
```bash
npm install -g pm2
```

---

## Step 3: Prepare Your Application Directory

```bash
# Navigate to your application directory
cd /var/www/pd_gupta/pd_gupta

# Pull latest code (if using git)
git pull origin main
```

---

## Step 4: Set Up Environment Variables

### Create production environment file
```bash
nano .env.production
```

### Add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production
```

**Save and exit:** Press `CTRL+X`, then `Y`, then `Enter`

### Secure the environment file
```bash
chmod 600 .env.production
```

---

## Step 5: Install Dependencies and Build

```bash
# Install all dependencies
npm install --production=false

# Build the Next.js application
npm run build
```

**Important:** The build must complete successfully before proceeding.

---

## Step 6: Configure PM2 for Production

### Create PM2 ecosystem file
```bash
nano ecosystem.config.js
```

### Add the following configuration:
```javascript
module.exports = {
  apps: [{
    name: 'pd-gupta-website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
```

### Create logs directory
```bash
mkdir -p logs
```

---

## Step 7: Start the Application with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system reboot
pm2 startup
# Follow the command output instructions
```

### Useful PM2 Commands:
```bash
# Check application status
pm2 status

# View logs
pm2 logs pd-gupta-website

# Restart application
pm2 restart pd-gupta-website

# Stop application
pm2 stop pd-gupta-website

# Monitor application
pm2 monit
```

---

## Step 8: Configure Nginx (Reverse Proxy)

### Edit Nginx configuration
```bash
nano /etc/nginx/sites-available/pd-gupta
```

### Add/Update the configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect to HTTPS (if SSL is configured)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Next.js static files
    location /_next/static {
        proxy_cache STATIC;
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Next.js public files
    location /public {
        proxy_cache STATIC;
        proxy_ignore_headers Cache-Control;
        proxy_cache_valid 60m;
        proxy_pass http://localhost:3000;
    }
}
```

### Enable the site and restart Nginx
```bash
# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 9: Install SSL Certificate (Optional but Recommended)

### Using Let's Encrypt (Certbot)
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically by Certbot
```

---

## Step 10: Verify Deployment

1. **Check PM2 status:**
   ```bash
   pm2 status
   pm2 logs pd-gupta-website --lines 50
   ```

2. **Check if the application is running:**
   ```bash
   curl http://localhost:3000
   ```

3. **Access your website:**
   - Open your browser and navigate to: `http://yourdomain.com`

---

## Troubleshooting

### Firebase Authentication Error

**Error:** `Firebase: Error (auth/invalid-api-key)`

**Solution:**
1. Verify your `.env.production` file has correct Firebase credentials
2. Rebuild the application: `npm run build`
3. Restart PM2: `pm2 restart pd-gupta-website`

### Application Not Starting

**Check logs:**
```bash
pm2 logs pd-gupta-website
cat logs/err.log
```

**Common issues:**
- Missing `.env.production` file
- Invalid Firebase credentials
- Port 3000 already in use
- Missing build files

### Build Errors

**Clean and rebuild:**
```bash
# Remove old build
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Port Already in Use

**Find and kill the process:**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or stop all PM2 processes
pm2 stop all
pm2 delete all
```

---

## Updating Your Application

### Manual Update Process:
```bash
# Navigate to app directory
cd /var/www/pd_gupta/pd_gupta

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart pd-gupta-website

# Check status
pm2 status
pm2 logs pd-gupta-website --lines 20
```

### Automated Deployment (Optional):

Create a deployment script: `deploy.sh`
```bash
#!/bin/bash
cd /var/www/pd_gupta/pd_gupta
git pull origin main
npm install
npm run build
pm2 restart pd-gupta-website
echo "Deployment completed at $(date)"
```

Make it executable:
```bash
chmod +x deploy.sh
```

---

## Security Best Practices

1. **Keep environment variables secure:**
   ```bash
   chmod 600 .env.production
   ```

2. **Update system regularly:**
   ```bash
   sudo apt-get update
   sudo apt-get upgrade
   ```

3. **Configure firewall:**
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

4. **Use SSL/TLS:**
   - Always use HTTPS in production
   - Install SSL certificate using Let's Encrypt

5. **Regular backups:**
   - Backup your application code
   - Backup Firebase data
   - Backup environment variables

---

## Monitoring and Logs

### View application logs:
```bash
# Real-time logs
pm2 logs pd-gupta-website

# Last 100 lines
pm2 logs pd-gupta-website --lines 100

# Error logs only
tail -f logs/err.log

# Output logs only
tail -f logs/out.log
```

### Monitor resources:
```bash
pm2 monit
```

---

## Quick Reference Commands

```bash
# Application Management
pm2 start ecosystem.config.js      # Start app
pm2 stop pd-gupta-website          # Stop app
pm2 restart pd-gupta-website       # Restart app
pm2 delete pd-gupta-website        # Remove from PM2
pm2 logs pd-gupta-website          # View logs
pm2 monit                          # Monitor resources

# Build Commands
npm install                         # Install dependencies
npm run build                       # Build for production
npm run start                       # Start production server

# Nginx
sudo nginx -t                       # Test configuration
sudo systemctl restart nginx        # Restart Nginx
sudo systemctl status nginx         # Check Nginx status

# System
sudo systemctl status pm2-root      # Check PM2 service
free -h                             # Check memory
df -h                               # Check disk space
```

---

## Support

If you encounter issues:
1. Check logs: `pm2 logs pd-gupta-website`
2. Verify environment variables: `cat .env.production`
3. Check Firebase console for API key status
4. Ensure all services are running: `pm2 status` and `sudo systemctl status nginx`

For Firebase-related issues, refer to: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
