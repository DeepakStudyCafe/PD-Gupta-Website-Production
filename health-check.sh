#!/bin/bash

# Deployment Health Check Script
# This script checks if your VPS is ready for deployment

echo "🔍 PD Gupta Website - Deployment Health Check"
echo "=============================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track issues
ISSUES=0

# Function to check command exists
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed: $(command -v $1)"
        if [ "$1" == "node" ]; then
            echo "  Version: $(node --version)"
        elif [ "$1" == "npm" ]; then
            echo "  Version: $(npm --version)"
        elif [ "$1" == "pm2" ]; then
            echo "  Version: $(pm2 --version)"
        fi
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        ISSUES=$((ISSUES + 1))
    fi
}

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 does NOT exist"
        ISSUES=$((ISSUES + 1))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 directory exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 directory does NOT exist"
        ISSUES=$((ISSUES + 1))
        return 1
    fi
}

# Function to check port
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠${NC} Port $1 is already in use"
        echo "  Process: $(lsof -Pi :$1 -sTCP:LISTEN | tail -n 1)"
        ISSUES=$((ISSUES + 1))
    else
        echo -e "${GREEN}✓${NC} Port $1 is available"
    fi
}

echo "1. Checking Required Software"
echo "------------------------------"
check_command node
check_command npm
check_command pm2
check_command nginx
check_command git
echo ""

echo "2. Checking Node.js Version"
echo "----------------------------"
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    echo -e "${GREEN}✓${NC} Node.js version is adequate ($NODE_VERSION.x)"
else
    echo -e "${RED}✗${NC} Node.js version too old ($NODE_VERSION.x). Need 18+ or higher"
    ISSUES=$((ISSUES + 1))
fi
echo ""

echo "3. Checking Project Files"
echo "--------------------------"
check_file "package.json"
check_file "next.config.js"
check_file "ecosystem.config.js"
check_file ".env.production" || echo -e "${YELLOW}  → Create this file with: cp .env.production.example .env.production${NC}"
echo ""

echo "4. Checking Environment Variables"
echo "----------------------------------"
if [ -f ".env.production" ]; then
    if grep -q "your_firebase_api_key" .env.production || grep -q "your_api_key" .env.production; then
        echo -e "${RED}✗${NC} .env.production contains placeholder values"
        echo "  Please update with actual Firebase credentials"
        ISSUES=$((ISSUES + 1))
    else
        echo -e "${GREEN}✓${NC} .env.production appears to be configured"
    fi
    
    # Check required variables
    REQUIRED_VARS=("NEXT_PUBLIC_FIREBASE_API_KEY" "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" "NEXT_PUBLIC_FIREBASE_PROJECT_ID")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env.production; then
            echo -e "${GREEN}✓${NC} $var is set"
        else
            echo -e "${RED}✗${NC} $var is missing"
            ISSUES=$((ISSUES + 1))
        fi
    done
else
    echo -e "${RED}✗${NC} .env.production file not found"
    ISSUES=$((ISSUES + 1))
fi
echo ""

echo "5. Checking Dependencies"
echo "------------------------"
if check_dir "node_modules"; then
    echo -e "${GREEN}✓${NC} Dependencies are installed"
else
    echo -e "${YELLOW}⚠${NC} Dependencies not installed. Run: npm install"
fi
echo ""

echo "6. Checking Build"
echo "------------------"
if check_dir ".next"; then
    echo -e "${GREEN}✓${NC} Production build exists"
else
    echo -e "${YELLOW}⚠${NC} No production build found. Run: npm run build"
fi
echo ""

echo "7. Checking Port Availability"
echo "------------------------------"
check_port 3000
echo ""

echo "8. Checking PM2 Status"
echo "----------------------"
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "pd-gupta-website"; then
        echo -e "${GREEN}✓${NC} Application is registered with PM2"
        pm2 describe pd-gupta-website | grep -E "status|uptime|restart"
    else
        echo -e "${YELLOW}⚠${NC} Application not found in PM2"
        echo "  Start with: pm2 start ecosystem.config.js"
    fi
else
    echo -e "${RED}✗${NC} PM2 not available"
fi
echo ""

echo "9. Checking Nginx"
echo "-----------------"
if command -v nginx &> /dev/null; then
    if systemctl is-active --quiet nginx; then
        echo -e "${GREEN}✓${NC} Nginx is running"
    else
        echo -e "${RED}✗${NC} Nginx is not running"
        echo "  Start with: sudo systemctl start nginx"
        ISSUES=$((ISSUES + 1))
    fi
    
    # Test nginx config
    if nginx -t &>/dev/null; then
        echo -e "${GREEN}✓${NC} Nginx configuration is valid"
    else
        echo -e "${RED}✗${NC} Nginx configuration has errors"
        nginx -t
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC} Nginx not installed (optional for deployment)"
fi
echo ""

echo "10. Checking System Resources"
echo "------------------------------"
echo "Memory Usage:"
free -h | grep Mem
echo ""
echo "Disk Usage:"
df -h / | tail -n 1
echo ""

echo "11. Checking Firewall"
echo "----------------------"
if command -v ufw &> /dev/null; then
    if ufw status | grep -q "Status: active"; then
        echo -e "${GREEN}✓${NC} UFW firewall is active"
        ufw status | grep -E "22|80|443"
    else
        echo -e "${YELLOW}⚠${NC} UFW firewall is not active"
    fi
else
    echo -e "${YELLOW}⚠${NC} UFW not installed"
fi
echo ""

echo "=============================================="
echo "Health Check Summary"
echo "=============================================="

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Your system is ready for deployment.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. If not built yet: npm run build"
    echo "2. Start application: pm2 start ecosystem.config.js"
    echo "3. Save PM2 config: pm2 save"
    echo "4. Setup autostart: pm2 startup"
else
    echo -e "${RED}✗ Found $ISSUES issue(s) that need attention.${NC}"
    echo ""
    echo "Please fix the issues above before deploying."
fi

echo ""
echo "For detailed deployment instructions, see:"
echo "  - HOSTINGER_VPS_DEPLOYMENT.md"
echo "  - DEPLOY_QUICK_REFERENCE.md"
echo ""
