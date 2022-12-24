FROM node:16.17-alpine3.15 as frontBuilder

COPY . .
RUN yarn global add webpack-cli
RUN webpack-cli info
RUN yarn install
RUN yarn build
RUN ls -la dist/

FROM nginx:1.18-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN  adduser --disabled-password -s /sbin/nologin www
EXPOSE 80

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=frontBuilder dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
