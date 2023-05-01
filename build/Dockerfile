
FROM --platform=linux/amd64  node:16.14.0 as build-deps-wizard

# build wizard
WORKDIR /usr/src/app/wizard
# COPY wizard .
COPY wizard/out/index.html build/index.html
# RUN yarn
# RUN rm -Rf build && yarn run build


WORKDIR /app
RUN wget https://github.com/ethereum/staking-deposit-cli/releases/download/v2.5.0/staking_deposit-cli-d7b5304-linux-amd64.tar.gz
RUN tar zxvf *.tar.gz
RUN ls -l
RUN rm *.tar.gz
RUN mv */deposit ./
RUN ls -l

# build final image
FROM --platform=linux/amd64 debian:stable-20230411-slim

WORKDIR /usr/src/app

USER root

# RUN apk add --no-cache libressl ca-certificates supervisor expect wget nginx nodejs npm
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata
RUN apt-get install -y supervisor expect wget nginx nodejs npm
# nginx nodejs npm
# RUN rm -rf glibc.apk glibc-bin.apk /var/cache/apk/*
RUN rm -rf /var/lib/apt/lists/*

COPY --from=build-deps-wizard /app/deposit /usr/bin/deposit
RUN chmod +x /usr/bin/deposit

RUN mkdir -p /usr/src/app/scripts
COPY files/mkkeys.sh /usr/src/app/scripts
RUN chmod +x /usr/src/app/scripts/mkkeys.sh
COPY files/mkkeys_mnemonic.sh /usr/src/app/scripts
RUN chmod +x /usr/src/app/scripts/mkkeys_mnemonic.sh

# Wizard
COPY --from=build-deps-wizard /usr/src/app/wizard/build /usr/local/wizard

# Monitor
WORKDIR /usr/src/monitor
COPY monitor .
#COPY --from=build-deps-wizard /usr/src/app/monitor /usr/src/monitor
WORKDIR /usr/src/monitor
RUN npm i 

COPY files/supervisord.conf /etc/supervisord/
COPY files/nginx.conf /etc/nginx/


ENTRYPOINT supervisord -n -c /etc/supervisord/supervisord.conf
