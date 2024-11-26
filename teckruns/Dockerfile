FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN ls -al /app/dist/teckruns
FROM nginx:alpine
COPY --from=build /app/dist/teckruns /usr/share/nginx/html
EXPOSE 8080 
CMD ["nginx", "-g", "daemon off;"]