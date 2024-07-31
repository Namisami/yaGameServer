FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
# RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "dev"]
# CMD ["node", "dist/main.bundle.js"]
