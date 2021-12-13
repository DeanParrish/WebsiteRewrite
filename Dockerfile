# Stage 0: compile angular frontend
FROM node:14-alpine as build
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --prod


# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/my-test-angular-app  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginxsitesenabled /etc/nginx/sites-available/default
EXPOSE 80 443 3000 27017