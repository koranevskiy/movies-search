FROM node:18-alpine3.17 as build-stage
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/api /usr/share/nginx/html/api
EXPOSE 80
CMD ["nginx","-g","daemon off;"]