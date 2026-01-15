#!/bin/bash

# Deployment Script for PD Gupta Website
# This script automates the deployment process on Hostinger VPS

set -e  # Exit on any error

echo "🚀 Starting deployment process..."
echo "================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the correct directory?"
    exit 1
fi

print_success "Found package.json"

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    print_warning ".env.production not found!"
    echo "Please create .env.production with your Firebase credentials"
    echo "You can copy from .env.production.example:"
    echo "  cp .env.production.example .env.production"
    echo "Then edit it with your actual credentials"
    exit 1
fi

print_success "Found .env.production"

# Pull latest changes if using git
if [ -d ".git" ]; then
    echo ""
    echo "📥 Pulling latest changes from git..."
    git pull origin main || print_warning "Git pull failed or no changes"
    print_success "Git pull completed"
fi

# Install/update dependencies
echo ""
echo "📦 Installing dependencies..."
npm install --production=false
print_success "Dependencies installed"

# Build the application
echo ""
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed!"
    exit 1
fi

# Create logs directory if it doesn't exist
mkdir -p logs
print_success "Logs directory ready"

# Restart PM2 process
echo ""
echo "🔄 Restarting application with PM2..."

if pm2 describe pd-gupta-website > /dev/null 2>&1; then
    pm2 restart pd-gupta-website
    print_success "Application restarted"
else
    print_warning "Application not found in PM2, starting new instance..."
    pm2 start ecosystem.config.js
    pm2 save
    print_success "Application started"
fi

# Show status
echo ""
echo "📊 Application Status:"
echo "================================"
pm2 status pd-gupta-website

echo ""
echo "📝 Recent logs:"
echo "================================"
pm2 logs pd-gupta-website --lines 10 --nostream

echo ""
print_success "Deployment completed successfully!"
echo "================================"
echo ""
echo "Useful commands:"
echo "  pm2 logs pd-gupta-website  - View logs"
echo "  pm2 monit                  - Monitor resources"
echo "  pm2 restart pd-gupta-website - Restart app"
echo ""
