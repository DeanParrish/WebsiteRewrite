# Stage 0: compile angular frontend
FROM node:14-alpine as build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run buildprod


# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/my-test-angular-app  /usr/share/nginx/html
COPY nginxTrue.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443 3000 27017