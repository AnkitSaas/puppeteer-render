FROM ghcr.io/puppeteer/puppeteer:23.9.0

ENV PUPPETEER_SKIP_DOWNLOAD:true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN apt-get update && apt-get install -y chromium-browser

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci 
COPY . . 
CMD ["node", "index.js"]
