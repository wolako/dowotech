FROM node:18 AS build

WORKDIR /app

COPY teckruns/ .

RUN npm ci

RUN npm run build --configuration=production

FROM nginx:1.25-alpine

COPY nginx/dowotech.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/teckruns /var/www/dowotech-frontend/teckruns

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]