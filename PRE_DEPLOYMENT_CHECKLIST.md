# Pre-Deployment Checklist

Complete this checklist before deploying to production.

## ✅ Environment Setup

- [ ] **Firebase Project Created**
  - Created Firebase project in [Firebase Console](https://console.firebase.google.com/)
  - Enabled Firestore Database
  - Enabled Authentication (Email/Password)
  - Set up security rules

- [ ] **Environment Variables Ready**
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - [ ] `NEXT_PUBLIC_ADMIN_EMAIL`

## ✅ VPS Setup

- [ ] **Server Access**
  - SSH access to Hostinger VPS
  - Root or sudo privileges confirmed
  - SSH key authentication set up (recommended)

- [ ] **Required Software**
  - [ ] Node.js 18+ installed (`node --version`)
  - [ ] npm installed (`npm --version`)
  - [ ] PM2 installed (`pm2 --version`)
  - [ ] Nginx installed (`nginx -v`)
  - [ ] Git installed (`git --version`)

- [ ] **Application Directory**
  - Application cloned to `/var/www/pd_gupta/pd_gupta`
  - Correct permissions set
  - Git repository configured

## ✅ Security

- [ ] **SSL Certificate**
  - SSL certificate installed (Let's Encrypt recommended)
  - HTTPS configured in Nginx
  - HTTP to HTTPS redirect set up

- [ ] **Firewall**
  - [ ] Port 22 (SSH) allowed
  - [ ] Port 80 (HTTP) allowed
  - [ ] Port 443 (HTTPS) allowed
  - [ ] Port 3000 blocked from external access
  - UFW or iptables configured

- [ ] **File Permissions**
  - [ ] `.env.production` set to 600 (`chmod 600 .env.production`)
  - [ ] Application files owned by appropriate user
  - [ ] Logs directory writable

## ✅ Application Configuration

- [ ] **Environment File**
  - `.env.production` created on server
  - All Firebase credentials added
  - Admin email configured
  - File permissions secured (600)

- [ ] **Build Configuration**
  - `next.config.js` reviewed
  - Image domains configured
  - Environment variables accessible

- [ ] **PM2 Configuration**
  - `ecosystem.config.js` present
  - Port 3000 configured
  - Log paths configured
  - Memory limits set

## ✅ Domain & DNS

- [ ] **Domain Configuration**
  - Domain pointed to VPS IP address
  - A record configured
  - CNAME for www configured (optional)
  - DNS propagation completed (check with `nslookup yourdomain.com`)

- [ ] **Nginx Configuration**
  - Server block created for domain
  - Proxy pass to localhost:3000 configured
  - Static file caching configured
  - Nginx configuration tested (`sudo nginx -t`)

## ✅ Testing

- [ ] **Local Testing**
  - Application builds successfully locally (`npm run build`)
  - No build errors or warnings
  - All pages load correctly
  - Firebase connection works

- [ ] **Pre-Deployment Test**
  - Test build on server: `npm run build`
  - Test start on server: `npm run start`
  - Verify localhost:3000 responds: `curl http://localhost:3000`

## ✅ Backup

- [ ] **Backup Strategy**
  - Previous version backed up (if updating)
  - Environment variables backed up
  - Database export created (if applicable)
  - Rollback plan documented

## ✅ Monitoring

- [ ] **Logging**
  - Logs directory created (`mkdir -p logs`)
  - Log rotation configured (optional)
  - PM2 logs working (`pm2 logs`)

- [ ] **Monitoring Tools**
  - PM2 monitoring enabled (`pm2 monit`)
  - Server monitoring set up (optional)
  - Error tracking configured (optional)

## ✅ Documentation

- [ ] **Deployment Docs**
  - Deployment guide reviewed
  - Team members have access to documentation
  - Emergency contacts documented
  - Support channels identified

---

## Deployment Steps Order

Once all items are checked:

1. **Connect to VPS:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Navigate to app directory:**
   ```bash
   cd /var/www/pd_gupta/pd_gupta
   ```

3. **Create environment file:**
   ```bash
   cp .env.production.example .env.production
   nano .env.production
   # Add your credentials
   chmod 600 .env.production
   ```

4. **Install and build:**
   ```bash
   npm install
   npm run build
   ```

5. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

6. **Verify deployment:**
   ```bash
   pm2 status
   pm2 logs pd-gupta-website --lines 20
   curl http://localhost:3000
   ```

7. **Access website:**
   - Open browser: `http://yourdomain.com`

---

## Post-Deployment Verification

- [ ] Homepage loads without errors
- [ ] All navigation links work
- [ ] Images load correctly
- [ ] Forms submit successfully
- [ ] Admin panel accessible
- [ ] Firebase data loads
- [ ] No console errors in browser
- [ ] SSL certificate active (if configured)
- [ ] Mobile responsive
- [ ] Page load speed acceptable

---

## Troubleshooting Reference

If you encounter issues during deployment:

1. **Firebase Error:** Check `.env.production` credentials
2. **Build Error:** Review logs: `npm run build`
3. **Port Error:** Check if port 3000 is in use: `lsof -ti:3000`
4. **PM2 Error:** Check logs: `pm2 logs pd-gupta-website`
5. **Nginx Error:** Test config: `sudo nginx -t`

See [HOSTINGER_VPS_DEPLOYMENT.md](./HOSTINGER_VPS_DEPLOYMENT.md) for detailed troubleshooting.

---

## Contact & Support

- **Firebase Issues:** [Firebase Documentation](https://firebase.google.com/docs)
- **Next.js Issues:** [Next.js Documentation](https://nextjs.org/docs)
- **Hostinger Support:** Hostinger Help Center
- **PM2 Documentation:** [PM2 Docs](https://pm2.keymetrics.io/docs/)

---

**Last Updated:** January 2026
