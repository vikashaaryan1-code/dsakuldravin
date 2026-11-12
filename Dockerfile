# Production Full-Stack Dockerfile for AKUL DRAVIN DIGITAL SERVICES (ADCS)
# Single-container Node + Express API Gateway + Compiled React SPA (Ideal for Coolify Subdomains)

# Stage 1: Build Frontend & PDFs
FROM node:20-alpine AS builder

WORKDIR /app

# Ensure devDependencies (tsc, vite) are installed even if Coolify passes NODE_ENV=production
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

# Typecheck & Build Vite Production Bundle
RUN npm run build

# Generate Official Acrobat PDFs and include inside dist/
RUN node scripts/generate_acrobat_pdf.cjs && \
    cp -f Vedic_Janam_Kundli_Certificate.pdf dist/ && \
    cp -f AD_DIGITAL_Website_Audit_Deployment_Report.pdf dist/

# Stage 2: Production Runtime (Express serves /dist SPA + /api/* on Port 5000)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/Vedic_Janam_Kundli_Certificate.pdf ./
COPY --from=builder /app/AD_DIGITAL_Website_Audit_Deployment_Report.pdf ./
COPY server ./server

RUN mkdir -p /app/server/data/vault

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 5000) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server/server.mjs"]
