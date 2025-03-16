FROM node:alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.config /etc/nginx/nginx.conf
COPY --from=build /app/dist/skeedo-app /usr/share/nginx/html

RUN echo "mainFile=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
    envsubst '\$SERVICE_HOST' < \${mainFile} > main.tmp && \
    mv main.tmp \${mainFile} && \
    nginx -g 'daemon off;'" > run.sh

CMD ["sh", "run.sh"]
