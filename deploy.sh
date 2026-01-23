#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the project
echo "🔨 Building project..."
npm run build

# Restart with PM2
echo "♻️  Restarting application..."
pm2 restart fme

echo "✅ Deployment completed successfully!"
