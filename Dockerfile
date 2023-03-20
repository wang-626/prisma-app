FROM node:16

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install 
RUN mv key.json ../
WORKDIR  /usr
RUN mkdir "google-cloud"
WORKDIR  /usr/google-cloud

ENV GOOGLE_APPLICATION_CREDENTIALS=../key.json
ENV INSTANCE_CONNECTION_NAME="next-app-380811:asia-east1:prisna"
ENV DB_USER='root'
ENV DB_PASS='daib4567'
ENV DB_NAME='prisna'
ENV DB_PORT='3306'
RUN curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.0.0/cloud-sql-proxy.linux.amd64
RUN chmod +x cloud-sql-proxy
CMD ["sh", "-c", "./cloud-sql-proxy --port $DB_PORT --credentials-file=$GOOGLE_APPLICATION_CREDENTIALS $INSTANCE_CONNECTION_NAME & cd ../app && npm run dev"]