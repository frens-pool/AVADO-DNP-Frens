FROM node:18.15.0 as builder

# build wizard
WORKDIR /usr/src/app/wizard
COPY wizard .
RUN yarn --frozen-lockfile
RUN rm -Rf build && yarn run build

# Monitor
WORKDIR /usr/src/monitor
COPY monitor .
RUN yarn --frozen-lockfile
RUN rm -Rf build && yarn run build
RUN rm -Rf node_modules
RUN yarn --production

# Deposit CLI
WORKDIR /app
RUN wget https://github.com/ethereum/staking-deposit-cli/releases/download/v2.5.0/staking_deposit-cli-d7b5304-linux-amd64.tar.gz
RUN tar zxvf *.tar.gz
RUN ls -l
RUN rm *.tar.gz
RUN mv */deposit ./
RUN ls -l


####### Main image

FROM --platform=linux/amd64 node:18.15.0

RUN apt-get -y clean && apt-get -y update && apt-get -y upgrade && apt-get -y install \
    gettext\
    jq \
    nginx \
    sudo \
    supervisor \
    vim-tiny \
    && rm -rf /var/lib/apt/lists/*
RUN useradd -s /bin/false nginx

# copy wizard & monitor
COPY --from=builder /usr/src/app/wizard/out /usr/local/wizard
COPY --from=builder /usr/src/monitor/ /usr/local/monitor

RUN mkdir -p /usr/src/app/scripts
COPY files/mkkeys.sh /usr/src/app/scripts
RUN chmod +x /usr/src/app/scripts/mkkeys.sh
COPY files/mkkeys_mnemonic.sh /usr/src/app/scripts
RUN chmod +x /usr/src/app/scripts/mkkeys_mnemonic.sh

RUN curl "https://iso.ava.do/my.ava.do.crt" --output /etc/nginx/my.ava.do.crt --silent
RUN curl "https://iso.ava.do/my.ava.do.key" --output /etc/nginx/my.ava.do.key --silent

COPY files/supervisord.conf /etc/supervisord.conf
COPY files/nginx.conf /etc/nginx/

WORKDIR /
ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
