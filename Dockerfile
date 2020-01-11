FROM alpine:edge

RUN apk update

# japanese font
RUN apk add --no-cache curl fontconfig font-noto-cjk \
  && fc-cache -fv

# Installs latest Chromium (76) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm

# timezone
RUN apk add --update --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install

COPY . .
RUN npm run compile
ENV PORT 8080
EXPOSE 8080

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \ && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

CMD ["npm", "start"]
