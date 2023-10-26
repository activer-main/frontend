# 1. For build React app
FROM node:lts

# Set working directory
WORKDIR /app

# Same as npm install

USER root
RUN apt-get update && \
  apt-get install -y --no-install-recommends git 

EXPOSE 3000

COPY . /app
RUN npm i
RUN npm i -g serve

ENV CI=true
ENV PORT=3000

RUN npx update-browserslist-db@latest
RUN npm run build
CMD ["serve", "-s", "build"]
