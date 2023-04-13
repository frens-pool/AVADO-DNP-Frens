FROM --platform=linux/amd64 node:18 as builder

#build wizard
WORKDIR /usr/src/app/wizard
COPY wizard .
# RUN npm i
# RUN npm run build 
# RUN rm -Rf build && yarn build

# final image
FROM --platform=linux/amd64 alpine:3.17.3

RUN apk add --no-cache supervisor nginx nodejs yarn

# copy wizard & monitor
COPY --from=builder /usr/src/app/wizard/out /usr/local/wizard

# supervisor, nginx, entrypoint
ADD supervisord.conf /etc/supervisord.conf
ADD nginx.conf /etc/nginx/

WORKDIR /
ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
