# Multi-stage Dockerfile for AKUL DRAVIN DIGITAL SERVICES & VEDIC ASTROLOGY
# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with frozen lockfile
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Run automated tests before building
RUN node scripts/run_tests.mjs

# Build production bundle
RUN npm run build

# Generate Acrobat PDF certificates
RUN node scripts/generate_acrobat_pdf.cjs

# Stage 2: Serve with Production-Grade Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/Vedic_Janam_Kundli_Certificate.pdf /usr/share/nginx/html/
COPY --from=builder /app/AD_DIGITAL_Website_Audit_Deployment_Report.pdf /usr/share/nginx/html/

# Copy custom high-performance Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
