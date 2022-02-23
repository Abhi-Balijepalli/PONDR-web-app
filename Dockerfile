# Stage 1
FROM node:8 as react-build
RUN mkdir /app
WORKDIR /app
EXPOSE 80
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
