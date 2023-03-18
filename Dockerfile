FROM node:16

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install 
RUN apt-get update -y && apt-get install vim -y 
RUN cd /
RUN curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-422.0.0-linux-x86_64.tar.gz
RUN tar -xf google-cloud-cli-422.0.0-linux-x86_64.tar.gz
RUN curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.0.0/cloud-sql-proxy.linux.amd64
RUN chmod +x cloud-sql-proxy